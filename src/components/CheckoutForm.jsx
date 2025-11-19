
import React, { useState } from 'react';

const CheckoutForm = ({ onCheckout }) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Form submitted, calling onCheckout with details:', deliveryDetails);
    onCheckout(deliveryDetails); // Pass details to the parent handler
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" value={deliveryDetails.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input type="tel" id="phone" value={deliveryDetails.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" value={deliveryDetails.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
          <input type="text" id="address" value={deliveryDetails.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-gray-700 font-bold mb-2">Delivery Instructions</label>
          <textarea id="instructions" rows="4" value={deliveryDetails.instructions} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"></textarea>
        </div>
        <button type="submit" className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-amber-700 transition-colors duration-300">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

