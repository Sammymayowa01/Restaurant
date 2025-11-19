const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  user: {
    type: String, // Or mongoose.Schema.Types.ObjectId if you have a User model
    required: true,
    default: 'guest' // A default user for simplicity
  }
});

module.exports = mongoose.model('Cart', cartSchema);
