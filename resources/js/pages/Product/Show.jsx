import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout'; // Sesuaikan dengan layout Anda

export default function ProductShow({ auth, product }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleBuyNow = (e) => {
        e.preventDefault();
        post(route('orders.placeOrder'), {
            onSuccess: () => {
                alert('Pesanan berhasil ditempatkan!');
                // Opsional: Redirect atau refresh halaman untuk menampilkan stok terbaru
                window.location.reload();
            },
            onError: (err) => {
                let errorMessage = 'Terjadi kesalahan saat memproses pesanan.';
                if (err.error) { // Cek jika ada pesan error spesifik dari backend
                    errorMessage = err.error;
                } else if (err.quantity) { // Cek jika ada error validasi kuantitas
                    errorMessage = err.quantity;
                }
                alert(errorMessage);
            },
        });
    };

    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Produk</h2>}
        >
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-auto rounded-lg shadow-md object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                                    <span className="text-gray-500">Gambar Tidak Tersedia</span>
                                </div>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="mt-3 text-gray-700 leading-relaxed">{product.description}</p>
                            <div className="mt-4">
                                <span className="text-2xl font-semibold text-blue-600">
                                    Rp{product.price.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="mt-4 text-gray-800">
                                <span className="font-medium">Stok Tersedia: </span>
                                <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-bold`}>
                                    {product.stock > 0 ? product.stock : 'Habis'}
                                </span>
                            </div>

                            <form onSubmit={handleBuyNow} className="mt-6">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Jumlah:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    max={product.stock} // Batasi input sesuai stok
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))} // Pastikan kuantitas tidak kurang dari 1 dan tidak lebih dari stok
                                    className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    disabled={product.stock === 0} // Disable input jika stok 0
                                />
                                {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}

                                <button
                                    type="submit"
                                    disabled={processing || product.stock === 0 || data.quantity <= 0}
                                    className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Memproses...' : 'Beli Sekarang'}
                                </button>
                            </form>

                            {recentlySuccessful && (
                                <div className="mt-4 text-green-600 text-sm">Pesanan berhasil diproses!</div>
                            )}

                            <div className="mt-6">
                                <Link
                                    href={route('products.index')}
                                    className="text-blue-500 hover:underline"
                                >
                                    &larr; Kembali ke Daftar Produk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}