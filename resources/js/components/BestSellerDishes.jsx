// resources/js/Components/BestSellerDishes.jsx

import React from 'react';
import DishCard from './DishCard'; // Pastikan path import benar

export default function BestSellerDishes({ dishes, title, subtitle }) {
  // `dishes` adalah array of dish objects
  // Contoh:
  // const sampleDishes = [
  //   { id: 1, imageUrl: 'https://via.placeholder.com/300x200/FFC0CB/000000?text=Dish+1', name: 'Breakfast Food 1', price: 230, rating: 5, buyUrl: '#' },
  //   { id: 2, imageUrl: 'https://via.placeholder.com/300x200/ADD8E6/000000?text=Dish+2', name: 'Health Breakfast', price: 230, rating: 5, buyUrl: '#' },
  //   { id: 3, imageUrl: 'https://via.placeholder.com/300x200/90EE90/000000?text=Dish+3', name: 'Breakfast Food 2', price: 230, rating: 5 },
  //   { id: 4, imageUrl: 'https://via.placeholder.com/300x200/FFFFE0/000000?text=Dish+4', name: 'Breakfast Food 3', price: 230, rating: 5 },
  //   { id: 5, imageUrl: 'https://via.placeholder.com/300x200/FFA07A/000000?text=Dish+5', name: 'Breakfast Food 4', price: 230, rating: 5 },
  //   { id: 6, imageUrl: 'https://via.placeholder.com/300x200/DDA0DD/000000?text=Dish+6', name: 'Breakfast Food 5', price: 230, rating: 5 },
  // ];

  const defaultTitle = "Our best Seller Dishes 🔥🔥";
  const defaultSubtitle = "Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce, juicy tomatoe all tossed in your choice of dressing.";

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title || defaultTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No best seller dishes available at the moment.</p>
        )}
      </div>
    </section>
  );
}