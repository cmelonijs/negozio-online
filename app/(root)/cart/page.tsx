// import { prisma } from "@/db/prisma";
// import { auth } from "@/auth";
// import Image from "next/image";
// import { cartItemSchema } from "@/lib/validators";

// const CartPage = async () => {
//   const session = await auth();

//   if (!session) {
//     return <p>Please log in to view your cart.</p>;
//   }

//   if (!session.user) {
//     return <p>Session user is undefined. Please log in again.</p>;
//   }

//   const cart = await prisma.cart.findUnique({
//     where: { userId: session.user.id },
//   });

//   if (!cart || !cart.items) {
//     return <p>Your cart is empty.</p>;
//   }

//   // Si `cart.items` es un JSON string, parsearlo
//   const items = typeof cart.items === "string" ? JSON.parse(cart.items) : cart.items;

//   // Validar los elementos del carrito
//   interface CartItem {
//     productId: string;
//     name: string;
//     qty: number;
//     price: number;
//     image: string;
//   }

//   const validItems = items.filter((item: CartItem) => {
//     try {
//       cartItemSchema.parse(item);
//       return true;
//     } catch {
//       return false;
//     }
//   });

//   if (validItems.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div className="space-y-8">
//       <h2 className="h2-bold">Your Cart</h2>
//       <ul>
//         {validItems.map((item: CartItem) => (
//           <li key={item.productId}>
//             <p>Product name: {item.name}</p>
//             <p>Quantity: {item.qty}</p>
//             <p>Price: ${item.price}</p>
//             <Image src={item.image} alt={item.name} width={100} height={100} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CartPage;

// NEW CART PAGE
// import { getMyCart } from "@/lib/actions/cart.actions";
// import CartTable from "./cart-table";

export const metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  // const cart = await getMyCart();
  // return <CartTable cart={cart} />;

  <>Cart page</>;
};

export default CartPage;
