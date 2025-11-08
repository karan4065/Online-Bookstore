import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ item }) {
  return (
    <div className="p-2">
      <div className="w-full h-[450px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-shadow duration-300">
        
        {/* Image Section */}
        <div className="h-72 w-full bg-gray-100 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2 text-slate-800 dark:text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold truncate">{item.name}</h2>
            <span className="text-xs px-2 py-1 rounded-full bg-pink-500 dark:bg-teal-700 text-white">
              {item.category}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.title}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm font-semibold px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-slate-800 dark:text-white">
              ₹{item.price}
            </div>
            <Link
              to="/shop"
              state={{ item }}
              className="text-sm font-medium px-3 py-1 rounded-full border-pink-300 text-pink-500 border
              hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
