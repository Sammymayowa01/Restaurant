const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const nodemailer = require('nodemailer');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const existingSubscription = await NewsletterSubscriber.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }

    const newSubscription = new NewsletterSubscriber({ email });
    await newSubscription.save();

    // Setup transporter (for Gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to High-Y Kitchen Newsletter',
      text: 'Thank you for subscribing to our newsletter! You will receive updates on our latest menu, offers, and events.',
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent to:', email);
    } catch (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Subscription saved, but email failed to send.' });
    }

    res.status(201).json({ message: 'Subscription successful! A welcome email has been sent.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
