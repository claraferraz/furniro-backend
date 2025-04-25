import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // Example data for product details
  const productDetails = [
    {
      color: 'Blue',
      size: 'L',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Blue',
      size: 'XL',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Blue',
      size: 'XS',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Black',
      size: 'XL',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Black',
      size: 'L',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Brown',
      size: 'L',
      stock: 10,
      productId: 1,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 2,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 2,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 15,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 15,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 16,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 16,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 17,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 17,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 3,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 12,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 13,
    },
    {
      color: 'Gray',
      size: 'U',
      stock: 10,
      productId: 14,
    },
    {
      color: 'White',
      size: 'U',
      stock: 10,
      productId: 4,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 4,
    },
    {
      color: 'White',
      size: 'U',
      stock: 10,
      productId: 9,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 9,
    },
    {
      color: 'White',
      size: 'U',
      stock: 10,
      productId: 10,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 10,
    },
    {
      color: 'White',
      size: 'U',
      stock: 10,
      productId: 11,
    },
    {
      color: 'Black',
      size: 'U',
      stock: 10,
      productId: 11,
    },
    {
      color: 'White',
      size: 'XL',
      stock: 10,
      productId: 5,
    },
    {
      color: 'Blue',
      size: 'XL',
      stock: 10,
      productId: 5,
    },
    {
      color: 'White',
      size: 'XL',
      stock: 10,
      productId: 6,
    },
    {
      color: 'Blue',
      size: 'XL',
      stock: 10,
      productId: 6,
    },
    {
      color: 'White',
      size: 'XL',
      stock: 10,
      productId: 7,
    },
    {
      color: 'Blue',
      size: 'XL',
      stock: 10,
      productId: 7,
    },
    {
      color: 'White',
      size: 'XL',
      stock: 10,
      productId: 8,
    },
    {
      color: 'Blue',
      size: 'XL',
      stock: 10,
      productId: 8,
    },
    {
      color: 'White Wood',
      size: 'U',
      stock: 10,
      productId: 21,
    },
    {
      color: 'Brown Wood',
      size: 'U',
      stock: 10,
      productId: 21,
    },
    {
      color: 'White Wood',
      size: 'U',
      stock: 10,
      productId: 22,
    },
    {
      color: 'Brown Wood',
      size: 'U',
      stock: 10,
      productId: 22,
    },
    {
      color: 'White Wood',
      size: 'U',
      stock: 10,
      productId: 23,
    },
    {
      color: 'Brown Wood',
      size: 'U',
      stock: 10,
      productId: 23,
    },
    {
      color: 'White Wood',
      size: 'U',
      stock: 10,
      productId: 24,
    },
    {
      color: 'Brown Wood',
      size: 'U',
      stock: 10,
      productId: 24,
    },

  ];

  // Create products
  productDetails.map( async (p) => {
    await prisma.productDetails.createMany({
      data: {
        color: p.color,
        size: p.size,
        stock: p.stock,
        productId: p.productId,
      },
    });
  })


  // Example for creating users
  const users = [
    {
      username: 'claraadmin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
    },
    // Add more users as needed
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
