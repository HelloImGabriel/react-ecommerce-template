import prisma from "./prisma";

async function main() {
  // Initial products
  const products = [
    {
      name: 'Laptop',
      description: 'A high-performance laptop for developers.',
      price: 999.90,
      stock: 50,
      category: 'Electronics',
    },
    {
      name: 'T-Shirt',
      description: '100% cotton T-shirt with a custom design.',
      price: 19.90,
      stock: 100,
      category: 'Clothing',
    },
    {
      name: 'Headphones',
      description: 'Wireless headphones with noise cancellation.',
      price: 199.90,
      stock: 75,
      category: 'Electronics',
    },
    {
      name: 'Coffee Mug',
      description: 'Ceramic coffee mug with a unique design.',
      price: 9.90,
      stock: 200,
      category: 'Accessories',
    },
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with 5G connectivity.',
      price: 799.90,
      stock: 150,
      category: 'Electronics',
    },
    {
      name: 'Running Shoes',
      description: 'Comfortable and breathable running shoes.',
      price: 59.90,
      stock: 120,
      category: 'Footwear',
    },
    {
      name: 'Backpack',
      description: 'Durable backpack for everyday use.',
      price: 49.90,
      stock: 80,
      category: 'Accessories',
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with 10-hour battery life.',
      price: 39.90,
      stock: 60,
      category: 'Electronics',
    },
    {
      name: 'Smartwatch',
      description: 'Smartwatch with fitness tracking and notifications.',
      price: 129.90,
      stock: 90,
      category: 'Electronics',
    },
    {
      name: 'Winter Jacket',
      description: 'Insulated winter jacket for cold weather.',
      price: 89.90,
      stock: 40,
      category: 'Clothing',
    },
    {
      name: 'Sunglasses',
      description: 'UV-protective sunglasses with a sleek design.',
      price: 29.90,
      stock: 150,
      category: 'Accessories',
    },
    {
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable buttons.',
      price: 49.90,
      stock: 70,
      category: 'Electronics',
    }
  ];

  // Insert products into the database
  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product.name,
      },
      update: {
        price: product.price,
        description: product.description,
      },
      create: product
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
