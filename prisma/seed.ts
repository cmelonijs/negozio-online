import { PrismaClient } from '@prisma/client';
import sampleData from '../db/sample-data'; 

const prisma = new PrismaClient();

async function main() {
  //commenting the deleting because we dont need it anymore
  //await prisma.product.deleteMany();

  for (const product of sampleData.products) {
    await prisma.product.create({
      data: {
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
      },
    });
  }

  console.log('Sample data has been inserted!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
