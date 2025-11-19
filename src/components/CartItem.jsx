import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Safely access nested menu item data
  const menuItem = item?.menuItem || {};
  const price = menuItem.price || 0;
  const name = menuItem.name || 'Unknown Item';
  const image = menuItem.image || '/placeholder.png'; // fallback image

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg mr-6 shadow-md"
        />
        <div>
          <h4 className="font-bold text-lg text-stone-800">{name}</h4>
          <p className="text-stone-600 text-md">
            &#8358;{price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center border border-stone-300 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            className="px-3 py-1 text-xl text-stone-600 hover:bg-stone-100 rounded-l-lg"
          >
            -
          </button>
          <span className="px-4 py-1 text-lg font-bold text-stone-800">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            className="px-3 py-1 text-xl text-stone-600 hover:bg-stone-100 rounded-r-lg"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemoveItem(item._id)}
          className="ml-6 text-red-500 hover:text-red-700 transition-colors"
        >
          <i className="bi bi-trash-fill text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
