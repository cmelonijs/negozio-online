import { PrismaClient } from '@prisma/client';
import sampleData from '@/db/sample-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: sampleData.products.map((product) => ({
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      images: product.images, 
      price: product.price,
      brand: product.brand,
      rating: product.rating,
      numReviews: product.numReviews,
      stock: product.stock,
      isFeatured: product.isFeatured,
      banner: product.banner,
    })),
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
