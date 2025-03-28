"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const CredentialsSignUpForm = () => {
    const [data, action] = useActionState(signUpWithCredentials, {
        success: false,
        message: "",
      });
    
      const searchParams = useSearchParams();
    
      const callbackUrl = searchParams.get("callbackUrl") || "/";
    
      const SignUpButton = () => {
        const { pending } = useFormStatus();
    
        return (
          <Button disabled={pending} className="w-full" variant="default">
            {pending ? "Signing up..." : "Sign up"}
          </Button>
        );
      };
    
      return (
        <form action={action}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div className="space-y-6">
          <div>
              <Label className="mb-2" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="name"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="confirm-password">
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                autoComplete="confirm-password"
              />
            </div>
            <div>
              <SignUpButton />
            </div>
            {data && !data.success && (
              <div className="text-center text-destructive">{data.message}</div>
            )}
            <div className="text-sm text-center text-muted-foreground">
              Dont have an account?{" "}
              <Link href="/sign-up" target="_self" className="link">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      );
}
 
export default CredentialsSignUpForm;