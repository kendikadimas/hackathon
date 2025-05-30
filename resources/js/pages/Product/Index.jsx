import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout'; // Sesuaikan dengan layout Anda

export default function ProductIndex({ auth, products }) {
    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Produk</h2>}
        >
            <Head title="Daftar Produk" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {products.length === 0 ? (
                            <p className="text-gray-600 text-center">Belum ada produk yang tersedia.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
                                        {product.image_url && (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold text-gray-900 truncate">
                                                <Link href={route('products.show', product.id)} className="hover:text-blue-600">
                                                    {product.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                            <div className="mt-3 flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-800">
                                                    Rp{product.price.toLocaleString('id-ID')}
                                                </span>
                                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    Stok: {product.stock > 0 ? product.stock : 'Habis'}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <Link
                                                    href={route('products.show', product.id)}
                                                    className="inline-block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}