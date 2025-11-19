const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const reservationController = require('../controllers/reservationController');
const contactController = require('../controllers/contactController');
const subscribeController = require('../controllers/subscribeController');

// Menu Routes
router.get('/menu', menuController.getMenu);
router.get('/menu/:id', menuController.getMenuItem);

// Cart Routes
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.put('/cart/:id', cartController.updateCartItem);
router.delete('/cart/:id', cartController.removeFromCart);
router.delete('/cart', cartController.clearCart);

// Order Routes
router.post('/order', orderController.createOrder);

// Reservation Routes
router.post('/reservation', reservationController.createReservation);

// Contact Form Route
router.post('/contact', contactController.handleContactForm);

// Newsletter Subscription Route
router.post('/subscribe', subscribeController.subscribe);

module.exports = router;
