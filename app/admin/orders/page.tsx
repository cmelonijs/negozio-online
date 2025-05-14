import {getAllOrders} from "@/lib/actions/order.actions";
import {Fragment} from "react";
import OrdersTable from "./order-table";
import {Order} from "@/types";

const OrdersPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const query = resolvedSearchParams.q || 'all'; // Extract search query

    const { data: ordersData, totalPages } = await getAllOrders({ 
        limit: 10, 
        page: currentPage, 
        query 
    });

    const orders: Order[] = ordersData.map((order) => {
        const parsedAddress = typeof order.shippingAddress === 'string'
            ? JSON.parse(order.shippingAddress)
            : order.shippingAddress;

        return {
            id: order.id,
            createdAt: new Date(order.createdAt),
            shippingAddress: {
                fullName: parsedAddress?.fullName ?? "",
                streetAddress: parsedAddress?.streetAddress ?? "",
                city: parsedAddress?.city ?? "",
                postalCode: parsedAddress?.postalCode ?? "",
                Country: parsedAddress?.Country ?? "",
                lat: parsedAddress?.lat,
                lng: parsedAddress?.lng,
            },
            paymentMethod: order.paymentMethod,
            PaymentResult: order.PaymentResult,
            itemsPrice: order.itemsPrice.toString(),
            totalPrice: order.totalPrice.toString(),
            shippingPrice: order.shippingPrice.toString(),
            taxPrice: order.taxPrice.toString(),
            isPaid: order.isPaid,
            paidAt: order.paidAt ? new Date(order.paidAt) : null,
            isDelivered: order.isDelivered,
            deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : null,
            orderItems: [],
            user: {
                name: order.user.name ? order.user.name : '',
                email: "",
            },
            userId: order.userId,
        };
    });

    return (
        <Fragment>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <OrdersTable 
                orders={orders} 
                totalPages={totalPages} 
                currentPage={currentPage} 
                searchQuery={query !== 'all' ? query : ''} // Pass search query to table
            />
        </Fragment>
    );
}

export default OrdersPage;