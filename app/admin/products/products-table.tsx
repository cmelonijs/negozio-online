"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Pagination from "@/components/shared/pagination";
import { useState } from "react";
import { deleteProduct } from "@/lib/actions/products.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductsTable = ({
  products,
  totalPages,
  currentPage,
}: {
  products: { id: string; name: string; price: number; category: string; stock: number; rating: number }[];
  totalPages: number;
  currentPage: number;
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const router = useRouter();

  const openDeleteModal = (productId: string) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(productToDelete);

    try {
      const response = await deleteProduct(productToDelete);

      if (response.success) {
        toast.success(response.message);
        router.refresh();
        setIsModalOpen(false); // Only close the modal after successful deletion
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("Ocurrió un error al eliminar el producto");
    } finally {
      setIsDeleting(null);
      setProductToDelete(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700 w-full">
        <Table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="py-3 px-4 dark:text-gray-200">ID</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">NAME</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">PRICE</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">CATEGORY</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">STOCK</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">RATING</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="py-3 px-4 dark:text-gray-200">
                  ...{product.id.slice(-6)}
                </TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.name}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">${product.price}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.category}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.stock}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.rating}</TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button size="sm" variant="outline" className="text-base font-medium">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-base font-medium"
                      onClick={() => openDeleteModal(product.id)}
                      disabled={isDeleting === product.id}
                    >
                      {isDeleting === product.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        // Prevent closing modal during deletion
        if (!isDeleting) {
          setIsModalOpen(open);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              className="mr-2"
              disabled={isDeleting !== null}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isDeleting !== null}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-4">
        <Pagination page={currentPage} totalPages={totalPages} urlParamName="page" />
      </div>
    </div>
  );
};

export default ProductsTable;
