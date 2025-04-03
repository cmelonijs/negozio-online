"use client";

import { z } from "zod";
import { useForm, ControllerRenderProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { paymentMethodSchema } from "@/lib/validators";
import { PAYMENT_METHODS, DEFAULT_PAYMENT_METHOD } from "@/lib/costants/index";
import { paymentMethod, getUserPaymentMethod } from "@/lib/actions/user.actions";

export default function PaymentMethodForm() {
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: DEFAULT_PAYMENT_METHOD,
    },
  });

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      setIsLoading(true);
      const result = await getUserPaymentMethod();
      
      if (result.success && result.data) {
        form.setValue("type", result.data);
      }
      setIsLoading(false);
    };
    
    fetchPaymentMethod();
  }, [form]);

  const onSubmit = async (data: FieldValues) => {
    console.log("Selected Payment Method:", data);
    const formData = new FormData();
    
    formData.append("paymentMethod", data.type as string);
  
    await paymentMethod(formData);
  };
  
  if (isLoading) {
    return <div className="text-center p-4">Loading payment method...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Select Payment Method
        </h2>

        <FormField
          control={form.control}
          name="type"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof paymentMethodSchema>,
              "type"
            >;
          }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <RadioGroupItem value={method} id={method} />
                      <label htmlFor={method} className="text-sm text-gray-700">
                        {method}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}