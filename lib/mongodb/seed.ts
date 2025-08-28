import connectDB from './connection';
import Product from './models/Product';
import Collection from './models/Collection';
import { mockProducts, mockCollections } from '../api/mock-data';

export async function seedDatabase() {
  try {
    await connectDB();
    
    console.log('🌱 Seeding database...');

    // Clear existing data
    await Product.deleteMany({});
    await Collection.deleteMany({});

    // Seed products
    const products = await Product.insertMany(mockProducts);
    console.log(`✅ Seeded ${products.length} products`);

    // Seed collections
    const collections = await Collection.insertMany(mockCollections);
    console.log(`✅ Seeded ${collections.length} collections`);

    console.log('🎉 Database seeding completed!');
    
    return { products, collections };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
