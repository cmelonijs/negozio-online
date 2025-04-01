// // THIS FILE NEEDS TO BE DELETED, IT NEEDS TO BE HANDLE IN THE ACTION COMPONENT.

// import { prisma } from "@/db/prisma";
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const session = await auth();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { productId, quantity } = await req.json();

//   if (!productId || quantity <= 0) {
//     return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//   }

//   if (!session.user) {
//     return NextResponse.json(
//       { error: "User not found in session" },
//       { status: 401 }
//     );
//   }
//   const userId = session.user.id;

//   // Verificar si el carrito ya existe para el usuario
//   let cart = await prisma.cart.findUnique({
//     where: { userId },
//   });

//   if (!cart) {
//     // Crear un nuevo carrito si no existe
//     cart = await prisma.cart.create({
//       data: {
//         user: { connect: { id: userId } },
//         items: [],
//       },
//     });
//   }

//   // Añadir el producto al carrito
//   const updatedCart = await prisma.cart.update({
//     where: { userId },
//     data: {
//       items: {
//         push: { productId, quantity },
//       },
//     },
//   });

//   return NextResponse.json(updatedCart);
// }
