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

type User = {
  id: string;
  name: string;
  email?: string;
  role: string;
  createdAt: string;
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
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <Table className="bg-white dark:bg-black w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Role</TableHead>
            <TableHead className="px-4 py-2">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="px-4 py-2">{user.id}</TableCell>
              <TableCell className="px-4 py-2">{user.name}</TableCell>
              <TableCell className="px-4 py-2">{user.email || "—"}</TableCell>
              <TableCell className="px-4 py-2">{user.role}</TableCell>
              <TableCell className="px-4 py-2">
                {new Date(user.createdAt).toLocaleString()}
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
    </div>
  );
};

export default UsersTable;
