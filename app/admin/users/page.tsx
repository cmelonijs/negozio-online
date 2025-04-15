import { getAllUsers } from "@/lib/actions/user.actions";
import UsersTable from "./users-table";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const { data: rawUsers, totalPages } = await getAllUsers({
    limit: 8,
    page: currentPage,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users = rawUsers.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UsersTable users={users} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default UsersPage;
