import React from 'react';
export default function Banner () {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selamat Datang di Website UMKM Keren!</h2>
            <p className="text-gray-700 mb-4">
                Temukan berbagai produk lokal yang berkualitas dan dukung usaha kecil di sekitar Anda.
            </p>
            <p className="text-gray-600">
                Bergabunglah dengan kami untuk menjelajahi produk-produk unik dari UMKM terbaik!
            </p>
        </div>
    )
}