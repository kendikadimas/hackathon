// resources/js/Components/DishCard.jsx

import React from 'react';
import { Link } from '@inertiajs/react'; // Jika "Buy Now" mengarah ke halaman lain

// Komponen untuk menampilkan bintang rating
const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.28 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export default function DishCard({ dish }) {
  // Asumsi `dish` adalah objek dengan properti: id, imageUrl, name, price, rating, buyUrl (opsional)
  // Contoh:
  // const dish = {
  //   id: 1,
  //   imageUrl: '/images/placeholder-dish.jpg',
  //   name: 'Breakfast Special',
  //   price: 230, // Atau format string '$230'
  //   rating: 5,
  //   buyUrl: route('dishes.show', 1) // Contoh jika menggunakan Ziggy routes
  // };

  const handleBuyNow = () => {
    // Logika ketika tombol "Buy Now" diklik
    // Bisa berupa Inertia.visit(), Inertia.post(), atau membuka modal, dll.
    console.log(`Buy Now clicked for ${dish.name}`);
    if (dish.buyUrl) {
      // Inertia.get(dish.buyUrl); // Contoh jika pakai Inertia link
    }
    // Atau jika ini adalah tombol untuk menambah ke keranjang, Anda bisa memanggil fungsi lain
    // addToCart(dish.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img
        src={dish.imageUrl}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-black">{dish.name}</h3>
          {/* Jika "Buy Now" adalah link Inertia */}
          {dish.buyUrl ? (
            <Link
              href={dish.buyUrl}
              className="bg-red-500 hover:bg-red-600 text-black text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Buy Now
            </Link>
          ) : (
            <button
              onClick={handleBuyNow}
              className="bg-red-500 hover:bg-red-600 text-black text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Buy Now
            </button>
          )}
        </div>
        <div className="mt-auto flex justify-between items-center pt-2"> {/* mt-auto pushes this to bottom */}
          <StarRating rating={dish.rating} />
          <p className="text-xl font-bold text-gray-900">
            ${typeof dish.price === 'number' ? dish.price.toFixed(0) : dish.price}
          </p>
        </div>
      </div>
    </div>
  );
}