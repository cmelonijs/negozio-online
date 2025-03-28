import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/lib/costants";
import CredentialsSignUpForm from "./credentials-signup-form";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            {APP_NAME}
          </Link>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="my-4">
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
