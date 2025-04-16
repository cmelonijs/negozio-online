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
      Country: formData.get("Country"),
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

export const getAllUsers = async ({ limit, page }: { limit: number; page: number }) => {
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.user.count();

  return {
    data: users,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export const deleteUserById = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};


// update the user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    });

    return {
      success: true,
      message: "User has been updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateUser(user: { name: string; email: string; role: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    return {
      success: true,
      message: "User has been updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
