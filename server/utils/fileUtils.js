
const fs = require('fs').promises;

/**
 * Reads data from a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON data.
 */
const readData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT' || error.message.includes('Unexpected end of JSON input')) {
      return [];
    }
    throw error;
  }
};

/**
 * Writes data to a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @param {any} data - The data to write to the file.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * Reads and normalizes the cart data from a file.
 * @param {string} filePath - The path to the cart JSON file.
 * @returns {Promise<Array>} A promise that resolves with the cleaned, normalized cart data.
 */
const getNormalizedCart = async (filePath) => {
  const cart = await readData(filePath);
  const normalizedCart = cart.map(item => {
    if (item.menuItem && item.menuItem.id) {
      return { ...item.menuItem, quantity: item.quantity };
    }
    return item;
  });
  return normalizedCart;
};

module.exports = { readData, writeData, getNormalizedCart };
