import {getAllOrders} from "@/lib/actions/order.actions";
import {Fragment} from "react";
import OrdersTable from "./order-table";

const OrdersPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 1;


    const { data: orders, totalPages } = await getAllOrders({ limit: 10, page: currentPage, query: 'all' });

    return (
        <Fragment>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <OrdersTable orders={orders} totalPages={totalPages} currentPage={currentPage}/>
        </Fragment>
    );
}

export default OrdersPage;