"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  console.log("formData?", formData);
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    });

    const hashedPassword = await hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return {
      success: true,
      message: "Signed up successfully!",
    };

  } catch (err) {
    
    if (isRedirectError(err)) {
      throw err;
    }
    return {
      
      success: false,
      message: formatError(err),
    };
  }
}

// sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully!",
    };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      message: "Sign-in error. Try again. Make sure the email and password are correct",
    };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}
