"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
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
      message:
        "Sign-in error. Try again. Make sure the email and password are correct",
    };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) throw new Error("User not found");

  return user;
}
export async function changeAddress(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to update your address",
    };
  }
  
  try {
    const address = {
      fullName: formData.get("fullName"),
      streetAddress: formData.get("streetAddress"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      country: formData.get("Country"), 
    };

    await prisma.user.update({
      where: { id: session.user.id },
      data: { address },
    });

    return {
      success: true,
      message: "Address updated successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function paymentMethod(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to chose a payment method",
    };
  }
  
  try {
    const paymentMethod = {
      paymentMethod: formData.get("paymentMethod"),
    };

    await prisma.user.update({
      where: { id: session.user.id },
      data: { paymentMethod: paymentMethod.paymentMethod as string | null },
    });

    return {
      success: true,
      message: "Payment method updated successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
export async function getUserPaymentMethod() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to view payment methods",
      data: null,
    };
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { paymentMethod: true },
    });

    return {
      success: true,
      data: user?.paymentMethod || null,
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
      data: null,
    };
  }
}