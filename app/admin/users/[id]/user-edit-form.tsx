"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";

import { updateUser } from "@/lib/actions/user.actions";
import { updateUserSchema } from "@/lib/validators";
import { redirect } from "next/navigation";

interface ProfileFormProps {
  initialProfileForm?: z.infer<typeof updateUserSchema>;
  userId: string;
}

export default function UpdateUserForm({
  initialProfileForm,
  userId,
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialProfileForm || {
      name: "",
      email: "",
      role: "user",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    try {
      await updateUser({ ...data, id: userId });
      form.reset(data);
      toast.success("User updated successfully!");

      setTimeout(() => {
        redirect("/admin/users");
      }, 1000);
    } catch {
      toast.error("There was an error updating the user.");
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-4 p-6 bg-white dark:bg-zinc-900 shadow-lg border border-gray-300 dark:border-zinc-700 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-zinc-800"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">User</h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    disabled
                    className="border border-gray-400 dark:border-gray-700 dark:bg-zinc-800 dark:text-white p-2 rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className="border border-gray-400 dark:border-gray-700 dark:bg-zinc-800 dark:text-white p-2 rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border border-gray-400 dark:border-gray-700 dark:bg-zinc-800 dark:text-white p-2 rounded">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-zinc-800 dark:text-white">
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full dark:bg-yellow-400 dark:hover:bg-yellow-600"
          >
            {form.formState.isSubmitting ? "Saving..." : "Update User"}
          </Button>
        </form>
      </Form>
    </>
  );
}
