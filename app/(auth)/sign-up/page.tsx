import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign up</h1>
        <form className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            type="text"
            required
            autoComplete="name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="w-full p-3 rounded-lg bg-gray-600 text-white hover:bg-amber-400 focus:outline-none">
            Sign Up
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up" className="text-sm text-blue-500 hover:underline">
              Already have an account? Sign up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
