import { countUsersWithRole } from "@/lib/actions/user.actions";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const CustomersBox = async () => {
  const { success, total } = await countUsersWithRole("user");

  return (
    <Card className="p-4 flex flex-col justify-between h-36 rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold ml-1">Customers</h2>
        <Users className="w-7 h-7 stroke-[2.5] text-black dark:text-white mr-1" />
      </div>
      <p className="text-4xl font-bold text-center mt-2 mb-4">
        {success ? total : "—"}
      </p>
    </Card>
  );
};

export default CustomersBox;
