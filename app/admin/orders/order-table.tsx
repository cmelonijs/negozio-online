'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import Link from "next/link";
import {Fragment, useTransition} from "react";
import {formatCurrency, formatDate, truncateString} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {deleteOrder} from "@/lib/actions/order.actions";

const OrdersTable = ({ orders, totalPages, currentPage }) => {

    const tableHeadersTitle = ["ID", "DATE", "ORDER BY", "TOTAL", "PAID", "DELIVERED", "ACTIONS"];
    //TODO when the modal will be ready use isPending status to manage the delete API
    const [isPending, startTransition] = useTransition();

    return (
        <Fragment>
            <Table className="bg-white dark:bg-black w-full table-auto">
                <TableHeader>
                    <TableRow>
                        <>
                            {tableHeadersTitle.map((header, index) => (
                                <TableHead key={index} className="px-4 py-2">
                                    {header}
                                </TableHead>
                            ))}
                        </>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.id}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <TableCell className="px-4 py-2">
                            {truncateString(order.id)}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {formatDate(new Date(order.createdAt))}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.user.name}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {formatCurrency(order.totalPrice.toString())}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.isPaid ? formatDate(new Date(order.paidAt)) : "Not Paid"}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.isDelivered ? formatDate(new Date(order.deliveredAt)) : "Not Delivered"}
                            </TableCell>
                            <TableCell className="px-4 py-2 gap-2 flex items-center">
                                <Button variant="outline">
                                    <Link
                                        href={`/order/${order.id}`}
                                        className="text-white-500 hover:underline hover:text-yellow-600"
                                    >
                                        Details
                                    </Link>
                                </Button>
                                <Button disabled={isPending}  variant="destructive" onClick={

                                    () => {
                                        startTransition(async () => {
                                            const res = await deleteOrder(order.id);

                                            if (!res.success) {
                                                toast.error(res.message);
                                                return;
                                            }
                                            toast.success('Order successfully deleted')
                                        })
                                    }

                                }>
                                    Delete
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4">
                <Pagination page={currentPage} totalPages={totalPages} urlParamName="page" />
            </div>
        </Fragment>
    );
}

export default OrdersTable