import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      take: 4, //limiting the products
    });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch {
    return new Response('Error fetching products', { status: 500 });
  } finally {
    await prisma.$disconnect(); 
  }
}

