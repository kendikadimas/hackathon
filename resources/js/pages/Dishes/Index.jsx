import React from 'react';

export default function Index({ dishes }) {
  return (
    <div className="bg-white max-w-7xl mx-auto p-6">
      <h1 className="text-4xl text-black font-bold text-center mb-4">
        Produk Terbaik Kami
      </h1>
      <p className="text-center text-black mb-10">
        Berbagai menu varian dari Nasi Kebuli dan Nasi Briyani
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dishes.map((dish, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img src={dish.image} alt={dish.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg text-black font-semibold mb-2">{dish.title}</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  Buy Now
                </span>
              </div>
              <p className="text-lg text-black font-bold">Rp {dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
