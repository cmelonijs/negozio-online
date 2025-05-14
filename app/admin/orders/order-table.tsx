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
import {Fragment, useState, useTransition} from "react";
import {formatCurrency, formatDate, truncateString} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {deleteOrder} from "@/lib/actions/order.actions";
import {Order} from "@/types";
import {DeleteModal} from "@/components/shared/deleteModalComponent";

const OrdersTable = ({ 
    orders, 
    totalPages, 
    currentPage, 
    searchQuery = '' 
}: { 
    orders: Order[]; 
    totalPages: number; 
    currentPage: number;
    searchQuery?: string; 
}) => {

    const tableHeadersTitle = ["ID", "DATE", "ORDER BY", "TOTAL", "PAID", "DELIVERED", "ACTIONS"];
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

    const openDeleteModal = (orderId: string) => {
        setOrderToDelete(orderId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (!isPending) {
            setIsModalOpen(false);
            setTimeout(() => setOrderToDelete(null), 300); 
        }
    };

    const handleDeleteOrder = (orderId: string) => {
        startTransition(async () => {
            const res = await deleteOrder(orderId);

            if (!res.success) {
                toast.error(res.message);
                return;
            }
            toast.success('Order successfully deleted');
            closeDeleteModal();
        });
    };

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
                                {formatDate(order.createdAt)}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.user.name}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {formatCurrency(order.totalPrice)}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.isPaid && order.paidAt ? formatDate(order.paidAt) : "Not Paid"}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {order.isDelivered && order.deliveredAt ? formatDate(order.deliveredAt) : "Not Delivered"}
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
                                <Button 
                                    disabled={isPending}  
                                    variant="destructive" 
                                    onClick={() => openDeleteModal(order.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4">
                <Pagination 
                    page={currentPage} 
                    totalPages={totalPages} 
                    urlParamName="page" 
                    extraParams={searchQuery ? { q: searchQuery } : {}}
                />
            </div>

            {orderToDelete && (
                <DeleteModal
                    isOpen={isModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteOrder}
                    itemId={orderToDelete}
                    title="Delete Order"
                    description="Are you sure you want to delete this order? This action cannot be undone."
                    loading={isPending}
                />
            )}
        </Fragment>
    );
}

export default OrdersTable;
