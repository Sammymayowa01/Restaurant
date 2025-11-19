const Cart = require('../models/cart');
const Menu = require('../models/menu');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: 'guest' }).populate('items.menuItem');
    if (!cart) {
      // If no cart exists for the guest user, create one
      const newCart = new Cart({ user: 'guest', items: [] });
      await newCart.save();
      return res.json(newCart);
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error while fetching cart.' });
  }
};

exports.addToCart = async (req, res) => {
  const { menuItem, quantity } = req.body;

  if (!menuItem || !menuItem._id) {
    return res.status(400).json({ message: 'Invalid menu item provided.' });
  }

  try {
    let cart = await Cart.findOne({ user: 'guest' });

    if (!cart) {
      cart = new Cart({ user: 'guest', items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.menuItem && item.menuItem.toString() === menuItem._id);

    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, add to cart
      cart.items.push({ menuItem: menuItem._id, quantity });
    }

    await cart.save();
    const populatedCart = await Cart.findOne({ user: 'guest' }).populate('items.menuItem');
    res.json(populatedCart);

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error while adding to cart.' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: 'guest' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
      const populatedCart = await Cart.findOne({ user: 'guest' }).populate('items.menuItem');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Item not found in cart.' });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error while updating cart item.' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    let cart = await Cart.findOne({ user: 'guest' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      const populatedCart = await Cart.findOne({ user: 'guest' }).populate('items.menuItem');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Item not found in cart.' });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error while removing from cart.' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: 'guest' });
    if (cart) {
      cart.items = [];
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found.' });
    }
  } catch (error) {
    console.error('Error in clearCart:', error);
    res.status(500).json({ message: 'Server error while clearing cart.' });
  }
};
