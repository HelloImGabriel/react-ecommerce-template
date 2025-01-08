import prisma from "./prisma";

async function main() {
  // Initial products
  const products = [
    {
      name: 'Laptop',
      description: 'A high-performance laptop for developers.',
      price: 999.99,
      stock: 50,
      category: 'Electronics',
    },
    {
      name: 'T-Shirt',
      description: '100% cotton T-shirt with a custom design.',
      price: 19.99,
      stock: 100,
      category: 'Clothing',
    },
    {
      name: 'Headphones',
      description: 'Wireless headphones with noise cancellation.',
      price: 199.99,
      stock: 75,
      category: 'Electronics',
    },
    {
      name: 'Coffee Mug',
      description: 'Ceramic coffee mug with a unique design.',
      price: 9.99,
      stock: 200,
      category: 'Accessories',
    },
  ];

  // Insert products into the database
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Database seeded with products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
