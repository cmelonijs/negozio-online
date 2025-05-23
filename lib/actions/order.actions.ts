"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, ShippingAddress } from "@/types";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// create order and create the order items
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    const cart = await getMyCart();

    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }

    if (!user.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }

    // create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      paymentMethod: user.paymentMethod,
      shippingAddress: user.address,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      //create order
      const insertedOrder = await tx.order.create({ data: order });

      // create order items from the cart items
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }

      // clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { success: false, message: formatError(err) };
  }
}

// fetch order by id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItem: true,
      user: {
        select: { name: true, email: true },
      },
    },
  });

  return convertToPlainObject(data);
}

// update order to paid
 export async function updateOrderToPaid({
   orderId,
   paymentResult,
 }: {
   orderId: string;
   paymentResult?: PaymentRequest;
 }) {
   // get order from the db
   const order = await prisma.order.findFirst({
     where: {
       id: orderId,
    },
     include: {
      OrderItem: true,
     },
   });

  if (!order) {
    throw new Error("No order found");
   }

   if (order.isPaid) {
    throw new Error("Order is already paid");
   }

   // transaction to update order and account for product stock
   await prisma.$transaction(async (tx) => {
     // iterate over products and update the stock
     for (const item of order.OrderItem) {
       await tx.product.update({
         where: {
           id: item.productId,
         },
         data: {
           stock: { increment: -item.qty },
         },
       });
     }

     // set order to paid = true
     await tx.order.update({
       where: {
         id: orderId,
       },
       data: {
         isPaid: true,
         paidAt: new Date(),
         PaymentResult: paymentResult,
       },
     });
   });

   // get updated order after transaction
   const updatedOrder = await prisma.order.findFirst({
     where: {
       id: orderId,
    },
     include: {
       OrderItem: true,
       user: { select: { name: true, email: true } },
     },
   });

   if (!updatedOrder) throw new Error("Order not found");

   console.log("=================", updatedOrder);

   sendPurchaseReceipt({
     order: {
      ...updatedOrder,
       shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
       paymentResult: updatedOrder.PaymentResult as unknown as PaymentRequest,
     },
   });
 }

// get users orders
export async function getMyOrders({
  // limit = PAGE_SIZE,
  limit = 4,

  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("User is not authorized");
  }

  const data = await prisma.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    where: {
      userId: session?.user?.id,
    },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

type SalesDataType = {
  month: string;
  totalSales: number;
}[];

// get sales data and order summary
export async function getOrderSUmmary() {
  // get counts for each resource
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  // calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  // get monthly sales
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`
  SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

  const salesData: SalesDataType = salesDataRaw.map((data) => ({
    month: data.month,
    totalSales: Number(data.totalSales),
  }));

  // get latest sales
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
    },
    take: 6,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  };
}

// get all orders
export async function getAllOrders({
  // limit = PAGE_SIZE,
  limit = 4,

  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== "all"
      ? {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          },
        }
      : {};

  const data = await prisma.order.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  const dataCOunt = await prisma.order.count();

  return {
    data: convertToPlainObject(data),
    totalPages: Math.ceil(dataCOunt / limit),
  };
}

// delete an order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// update order to paid
// COD stands for "cash on delivery"
 export async function updateOrderToPaidCOD(orderId: string) {
   try {
     await updateOrderToPaid({ orderId });

     revalidatePath(`/order/${orderId}`);

     return {
      success: true,
       message: "Order marked as paid",
     };
   } catch (err) {
     return { success: false, message: formatError(err) };
   }
 }

// update order to delivered
export async function updateOrderToDelivered(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }
    if (!order.isPaid) {
      throw new Error("Order is not paid");
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: "Order marked as delivered",
    };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}

export async function getRecentSales(limit = 5) {
  try {
    const recentSales = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true, 
        createdAt: true,
        totalPrice: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return recentSales.map((sale) => ({
      id: sale.id, 
      name: sale.user?.name ?? "Unknown User",
      date: sale.createdAt,
      totalPrice: sale.totalPrice,
    }));
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}


export async function getOrdersByMonth() {
  const orders = await prisma.order.findMany({
    select: {
      totalPrice: true,
      createdAt: true,
    },
  });

  const totalsByMonth: Record<string, number> = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const year = date.getFullYear().toString().slice(-2);
    const endDate = `${month}/${year}`; 

    if (!totalsByMonth[endDate]) {
      totalsByMonth[endDate] = 0;
    }

    totalsByMonth[endDate] += Number(order.totalPrice);
  });

  // Convert to sorted array (optional but useful for charts)
  const result = Object.entries(totalsByMonth)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split("/").map(Number);
      const [bMonth, bYear] = b.month.split("/").map(Number);
      return aYear !== bYear ? aYear - bYear : aMonth - bMonth;
    });

  return result;
}

function sendPurchaseReceipt({ order }: { order: { shippingAddress: ShippingAddress; paymentResult: PaymentRequest; user: { email: string | null; name: string; }; OrderItem: { productId: string; image: string; name: string; price: Prisma.Decimal; slug: string; qty: number; orderId: string; }[]; userId: string; id: string; createdAt: Date; paymentMethod: string; PaymentResult: Prisma.JsonValue | null; itemsPrice: Prisma.Decimal; totalPrice: Prisma.Decimal; shippingPrice: Prisma.Decimal; taxPrice: Prisma.Decimal; isPaid: boolean; paidAt: Date | null; isDelivered: boolean; deliveredAt: Date | null; }; }) {
  console.log("Sending purchase receipt for order:", order);
}
