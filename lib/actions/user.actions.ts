"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { Prisma } from "@prisma/client";

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

export const getAllUsers = async ({ limit, page, query }: {
  limit: number;
  page: number;
  query?: string
}) => {
  const skip = (page - 1) * limit;
  // Create where clause if query exists
  const where = query ? {
    name: {
      contains: query,
      mode: Prisma.QueryMode.insensitive, // Makes the search case-insensitive
    }
  } : {};
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where,
    orderBy: { createdAt: "desc" },
  });

  // Count should respect the same filter
  const totalCount = await prisma.user.count({
    where,
  });

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

export async function updateUser(user: { id: string; name: string; email: string; role: string }) {
  try {
    await prisma.user.update({
      where: {
        id: user.id,
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


export async function adminDashboardStats(type: "products" | "users" | "orders" | "revenue", role?: string) {
  try {
    switch (type) {
      case "products":
        return {
          success: true,
          total: await prisma.product.count(),
        };
      case "users":
        return {
          success: true,
          total: await prisma.user.count({
            where: { role },
          }),
        };
      case "orders":
        return {
          success: true,
          total: await prisma.order.count(),
        };
      case "revenue":
        const revenue = await prisma.order.aggregate({
          _sum: { totalPrice: true },
        });
        return {
          success: true,
          total: revenue._sum.totalPrice?.toNumber() || 0,
        };
      default:
        throw new Error("Invalid type");
    }
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getUserRole(userId: string) {

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    return user?.role || 'user';
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return 'user';
  }
}
