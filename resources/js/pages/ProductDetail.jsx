// resources/js/Pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProductDetail({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        productId: product.id,
        quantity: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/place-order', data); // Ganti '/api/place-order' dengan endpoint yang sesuai
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-2 text-xl font-semibold">Harga: Rp{product.price}</p>
            <p className="mt-2 text-gray-700">Stok Tersedia: {product.stock}</p>

            <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Jumlah:</label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock} // Batasi input kuantitas sesuai stok
                    value={data.quantity}
                    onChange={(e) => setData('quantity', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}

                <button
                    type="submit"
                    disabled={processing || product.stock === 0}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Beli Sekarang'}
                </button>
            </form>

            {/* Anda bisa menampilkan pesan sukses/error dari backend di sini */}
            {/* {message && <div className="mt-4 text-green-600">{message}</div>} */}
            {/* {error && <div className="mt-4 text-red-600">{error}</div>} */}
        </div>
    );
}