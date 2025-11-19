const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Error in createReservation:', error);
    res.status(500).json({ message: 'Server error while creating reservation.' });
  }
};
