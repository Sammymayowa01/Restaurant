const Menu = require('../models/menu');

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({});
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).json({ message: 'Server error while fetching menu.' });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ message: 'Server error while fetching menu item.' });
  }
};
