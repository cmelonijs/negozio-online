"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import { useState } from "react";
import { deleteUserById } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteModal } from "@/components/shared/deleteModalComponent";

type User = {
  id: string;
  name: string;
  email?: string;
  role: string;
};

const UsersTable = ({
  users,
  totalPages,
  currentPage,
}: {
  users: User[];
  totalPages: number;
  currentPage: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (id: string) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
      setTimeout(() => setUserToDelete(null), 300); // Clear ID after close animation
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteUserById(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <Table className="bg-white dark:bg-black w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Role</TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="px-4 py-2">{user.id}</TableCell>
              <TableCell className="px-4 py-2">{user.name}</TableCell>
              <TableCell className="px-4 py-2">{user.email || "—"}</TableCell>
              <TableCell className="px-4 py-2">{user.role}</TableCell>
              <TableCell className="px-4 py-2 space-x-2">
                <Link href={`/admin/users/${user.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => openDeleteModal(user.id)}
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
        />
      </div>

      {userToDelete && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          itemId={userToDelete}
          title="Delete User"
          description="Are you sure you want to delete this user? This operation cannot be undone."
          loading={isDeleting}
        />
      )}
    </div>
  );
};

export default UsersTable;
