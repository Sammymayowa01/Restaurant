const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
const Menu = require('./models/menu');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding');

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log('Existing menu items cleared');

    // Read menu data from JSON file
    const menuJsonPath = path.join(__dirname, 'data', 'menu.json');
    const menuData = JSON.parse(await fs.readFile(menuJsonPath, 'utf-8'));

    // Insert new menu items
    await Menu.insertMany(menuData);
    console.log('Menu items have been successfully seeded');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Database disconnected');
  }
};

seedDatabase();
