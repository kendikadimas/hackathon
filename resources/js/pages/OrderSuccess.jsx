import React, { useState } from 'react'; // Tambahkan useState
import { Head, Link } from '@inertiajs/react';
import '../../css/app.css';

export default function OrderSuccess({ order, umkmPaymentDetails, message }) { // Terima umkmPaymentDetails dan message
    const [showPaymentDetails, setShowPaymentDetails] = useState(false); // State untuk toggle detail pembayaran

    return (
        <>
            <Head title="Pesanan Berhasil" />
            <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                    <h2 className="text-3xl font-extrabold text-green-600 mb-4">🎉 Pesanan Berhasil Diterima!</h2>
                    {message && <p className="text-green-500 mb-4 font-medium">{message}</p>} {/* Tampilkan flash message */}
                    <p className="text-gray-700 mb-6">Terima kasih, **{order.customer_name}**! Pesanan Anda dengan ID **#{order.id}** telah berhasil kami terima.</p>

                    <div className="border-t border-b border-gray-200 py-4 mb-6 text-left">
                        <p className="text-gray-800 font-semibold mb-2">Detail Pesanan:</p>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                            {order.product_details.map((item, index) => (
                                <li key={index}>{item.name} (Jumlah: {item.quantity}) - Rp{item.price.toLocaleString('id-ID')}</li>
                            ))}
                        </ul>
                        <p className="text-gray-800 font-semibold mb-2">Total Pembayaran: Rp{order.product_details.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('id-ID')}</p>
                        {order.notes && <p className="text-gray-700 mt-2">Catatan: {order.notes}</p>}
                        <p className="text-gray-700 mt-2">Kontak Anda: {order.customer_contact}</p>
                        <p className="text-gray-700 mt-2">Alamat Pengantaran: {order.delivery_address}</p>
                    </div>

                    <p className="text-gray-600 mb-6">UMKM akan segera menghubungi Anda untuk konfirmasi pembayaran dan detail pengiriman.</p>

                    {umkmPaymentDetails && (
                        <div className="mt-8">
                            <button
                                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 mb-4"
                            >
                                {showPaymentDetails ? 'Sembunyikan Detail Pembayaran' : 'Lihat Detail Pembayaran'}
                            </button>

                            {showPaymentDetails && (
                                <div className="border border-purple-300 p-4 rounded-md bg-purple-50 text-left">
                                    <h3 className="font-bold text-purple-800 mb-2">Pilihan Pembayaran:</h3>
                                    {umkmPaymentDetails.qris_image_url && (
                                        <div className="mb-4">
                                            <p className="font-semibold text-gray-800">Scan QRIS:</p>
                                            <img src={umkmPaymentDetails.qris_image_url} alt="QRIS Code" className="max-w-xs mx-auto my-2 border rounded-md" />
                                            <p className="text-sm text-gray-600">Pastikan jumlah yang ditransfer sesuai dengan total pesanan Anda.</p>
                                        </div>
                                    )}
                                    {(umkmPaymentDetails.bank_name || umkmPaymentDetails.account_number || umkmPaymentDetails.account_holder_name) && (
                                        <div>
                                            <p className="font-semibold text-gray-800">Transfer Bank:</p>
                                            <p className="text-gray-700">Bank: {umkmPaymentDetails.bank_name}</p>
                                            <p className="text-gray-700">Nomor Rekening: <span className="font-bold">{umkmPaymentDetails.account_number}</span></p>
                                            <p className="text-gray-700">Atas Nama: {umkmPaymentDetails.account_holder_name}</p>
                                        </div>
                                    )}
                                    {!umkmPaymentDetails.qris_image_url && !umkmPaymentDetails.bank_name && (
                                        <p className="text-gray-600">Detail pembayaran belum diatur oleh UMKM.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}


                    <Link href={route('order.create')} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 mt-8">
                        Pesan Lagi
                    </Link>
                </div>
            </section>
        </>
    );
}