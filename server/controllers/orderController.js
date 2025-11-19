
const Order = require('../models/order');
const Cart = require('../models/cart');

exports.createOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || !total) {
      return res.status(400).json({ message: 'Missing required fields: customer, items, or total.' });
    }

    const formattedItems = items.map(item => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity
    }));

    const newOrder = new Order({
      customer,
      items: formattedItems,
      total
    });

    const savedOrder = await newOrder.save();

    // Clear the cart after the order is saved
    const cart = await Cart.findOne({ user: 'guest' });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error in createOrder:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Order validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error while creating order.' });
  }
};

