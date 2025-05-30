
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Asumsi Anda punya layout ini

// Komponen untuk menampilkan detail produk individual
function ProductDetailCard({ product }) {
  // Fallback image jika product.image_url tidak ada atau error
  const handleError = (e) => {
    e.target.onerror = null; // Mencegah loop error jika placeholder juga error
    e.target.src = `https://placehold.co/600x400/e2e8f0/94a3b8?text=Gambar+Tidak+Tersedia`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          {product.image_url ? (
            <img
              className="h-64 w-full object-cover md:h-full"
              src={product.image_url}
              alt={`Gambar ${product.name}`}
              onError={handleError}
            />
          ) : (
            <img
              className="h-64 w-full object-cover md:h-full"
              src={`https://placehold.co/600x400/e2e8f0/94a3b8?text=Gambar+Tidak+Tersedia`}
              alt="Gambar tidak tersedia"
            />
          )}
        </div>
        <div className="p-8 md:w-1/2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
            Produk Detail
          </div>
          <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {product.description || 'Tidak ada deskripsi untuk produk ini.'}
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </p>
              <p className={`text-md font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                Stok: {product.stock > 0 ? product.stock : 'Habis'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {product.stock > 0 ? (
              <button
                type="button"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Tambah ke Keranjang
              </button>
            ) : (
              <p className="text-center text-red-500 dark:text-red-400 font-semibold">
                Stok produk ini sedang habis.
              </p>
            )}
            <Link
              href={route('products.index')} // Asumsi Anda punya route 'products.index'
              className="mt-4 block text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
            >
              Kembali ke Daftar Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


// Halaman utama untuk menampilkan detail produk
// 'product' akan di-pass sebagai prop dari controller Laravel via Inertia
export default function Show({ auth, product }) {
  return (
    // Ganti AuthenticatedLayout dengan layout yang Anda gunakan
    // Jika tidak menggunakan layout, Anda bisa membungkusnya dengan Fragment <> </>
    // atau div biasa dengan styling yang sesuai.
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Produk: {product.name}</h2>}
    >
      <Head title={`Produk - ${product.name}`} />

      <div className="py-12 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <ProductDetailCard product={product} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}