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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteUserById(id);
    window.location.reload();
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
                  onClick={() => setConfirmDeleteId(user.id)}
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

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <p className="mb-6">This operation cannot be undone</p>
            <div className="flex justify-end space-x-4">
              <Button variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
