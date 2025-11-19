const Contact = require('../models/contact');

exports.handleContactForm = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: 'Thank you for your message! We will get back to you soon.' });
  } catch (error) {
    console.error('Error in handleContactForm:', error);
    res.status(500).json({ message: 'Server error while processing contact form.' });
  }
};
