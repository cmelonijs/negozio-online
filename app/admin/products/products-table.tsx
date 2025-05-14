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
import Pagination from "@/components/shared/pagination";
import { Fragment, useState } from "react";
import { deleteProduct } from "@/lib/actions/products.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteModal } from "@/components/shared/deleteModalComponent";

const ProductsTable = ({
  products,
  totalPages,
  currentPage,
  searchQuery,
}: {
  products: { id: string; name: string; price: number; category: string; stock: number; rating: number }[];
  totalPages: number;
  currentPage: number;
  searchQuery?: string;
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const router = useRouter();

  const tableHeadersTitle = ["ID", "NAME", "PRICE", "CATEGORY", "STOCK", "RATING", "ACTIONS"];

  const openDeleteModal = (productId: string) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDelete = async (productId: string) => {
    setIsDeleting(productId);

    try {
      const response = await deleteProduct(productId);

      if (response.success) {
        toast.success(response.message);
        router.refresh();
        setIsModalOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("Ocurrió un error al eliminar el producto");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Fragment>
      <Table className="bg-white dark:bg-black w-full table-auto">
        <TableHeader>
          <TableRow>
            {tableHeadersTitle.map((header, index) => (
              <TableHead key={index} className="px-4 py-2">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell className="px-4 py-2">
                ...{product.id.slice(-6)}
              </TableCell>
              <TableCell className="px-4 py-2">{product.name}</TableCell>
              <TableCell className="px-4 py-2">${product.price}</TableCell>
              <TableCell className="px-4 py-2">{product.category}</TableCell>
              <TableCell className="px-4 py-2">{product.stock}</TableCell>
              <TableCell className="px-4 py-2">{product.rating}</TableCell>
              <TableCell className="px-4 py-2 gap-2 flex items-center">
                <Button variant="outline">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDeleteModal(product.id)}
                  disabled={isDeleting === product.id}
                >
                  {isDeleting === product.id ? "Deleting..." : "Delete"}
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

      {productToDelete && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          itemId={productToDelete}
          title="Confirm delete"
          description="Are you sure you want to delete this product? This action cannot be undone."
          loading={isDeleting !== null}
        />
      )}
    </Fragment>
  );
};

export default ProductsTable;
