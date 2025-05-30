// resources/js/Pages/Welcome.jsx

import React from 'react'; // Hapus useState dan useEffect dari import jika tidak dipakai
import { Head, usePage, useForm } from '@inertiajs/react';
import '../../css/app.css';
import TestimonialsSection from '../Components/TestimonialsSection';

export default function Welcome({ testimonials /*, auth */ }) {
    // Akses props halaman secara langsung dan aman
    // Inertia menjamin usePage().props akan valid saat komponen dirender.
    // Gunakan optional chaining untuk properti 'flash' yang mungkin tidak selalu ada.
    const flash = usePage().props?.flash; // <<< INI ADALAH CARA YANG BENAR DAN AMAN

    // Debugging: Ini akan sangat membantu. Periksa konsol browser setelah ini.
    console.log("usePage().props:", usePage().props); // Melihat semua props yang datang
    console.log("Flash object:", flash);
    console.log("Flash success (safe access):", flash?.success);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        author: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('testimonials.store'), {
            onSuccess: () => {
                reset('author', 'content');
                // Inertia secara otomatis akan melakukan request baru setelah POST
                // (karena controller mengembalikan Redirect::back()),
                // sehingga usePage().props akan di-update dan komponen akan di-render ulang
                // dengan data testimonial terbaru.
            },
            onError: (err) => {
                console.error("Error submitting testimonial:", err);
            },
        });
    };

    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center">
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Website UMKM Keren!</h1>

                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <strong className="font-bold">Sukses!</strong>
                            <span className="block sm:inline"> {flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {flash.error}</span>
                        </div>
                    )}

                    {/* Pastikan `testimonials` yang diterima dari Laravel diteruskan */}
                    <TestimonialsSection testimonials={testimonials} />

                    {/* Form Tambah Testimoni */}
                    <section className="bg-white p-8 rounded-lg shadow-md mt-12 w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Berikan Testimoni Anda!</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Nama Anda</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-green-600"
                                    required
                                />
                                {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Testimoni Anda</label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    rows="5"
                                    required
                                ></textarea>
                                {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Testimoni'}
                                </button>
                            </div>
                            {recentlySuccessful && <p className="mt-4 text-center text-green-600">Testimoni berhasil dikirim!</p>}
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}