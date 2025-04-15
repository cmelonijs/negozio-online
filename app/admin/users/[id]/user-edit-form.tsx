"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
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
import { updateProfile } from "@/lib/actions/user.actions";
import { updateProfileSchema } from "@/lib/validators";


interface ProfileFormProps {
  initialProfileForm?: z.infer<typeof updateProfileSchema>;
}

export default function ProfileForm({ initialProfileForm }: ProfileFormProps) {
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialProfileForm || {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    try {
      await updateProfile(data);
      form.reset(data);
      toast.success("Profile updated successfully!"); 
    } catch {
      toast.error("There was an error updating the profile."); 
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
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>

          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateProfileSchema>,
                "email"
              >;
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} disabled className="border p-2 rounded border-gray-400"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateProfileSchema>,
                "name"
              >;
            }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} className="border p-2 rounded border-gray-400"/>
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
            {form.formState.isSubmitting ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </>
  );
}
