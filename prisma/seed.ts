/* import { PrismaClient } from '@prisma/client';
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
 */

import { PrismaClient } from '@prisma/client';
import sampleData from '../db/sample-data'; 
import { z } from 'zod';

const prisma = new PrismaClient();

//Schema: structure or blueprint that defines how data is organized, validated, and represented.
const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()),
  price: z.number().positive(),
  brand: z.string().min(1),
  rating: z.number().min(0).max(5),
  numReviews: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  banner: z.string().min(1),
});

async function main() {
  // Commenting the deleting because we don't need it anymore
  // await prisma.product.deleteMany();

  for (const product of sampleData.products) {
    try {
      //vaslidating the product using the schema created abover
      productSchema.parse(product); 

      // only getds to tge await if it productSchema.parse(product) doesnt fail
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

      console.log(`Product'${product.name}' inserted successfully!`);
    } catch {
      console.error(`Error valdating product '${product.name}':`);
    }
  }

  console.log('Succesfull');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
