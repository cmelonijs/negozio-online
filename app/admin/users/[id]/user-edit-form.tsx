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

interface ProfileFormProps {
    initialProfileForm?: z.infer<typeof updateUserSchema>;
    userId: string;
  }
  

export default function UpdateUserForm({
  initialProfileForm,
  userId
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialProfileForm || {
      name: "",
      email: "",
      role: "user", // valor por defecto si no hay ninguno
    },
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    try {
      await updateUser({ ...data, id: userId });
      form.reset(data);
      toast.success("User updated successfully!");
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
          className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg hover:scale-105 hover:shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 ease-in-out rounded-lg"
        >
          <h2 className="text-xl font-semibold text-gray-800">User</h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    disabled
                    className="border p-2 rounded border-gray-400"
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className="border p-2 rounded border-gray-400"
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
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border p-2 rounded border-gray-400">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
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
            className="w-full"
          >
            {form.formState.isSubmitting ? "Saving..." : "Update User"}
          </Button>
        </form>
      </Form>
    </>
  );
}
