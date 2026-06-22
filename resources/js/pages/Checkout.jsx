import React from 'react'; // Menghapus useState karena tidak digunakan secara langsung di sini setelah modifikasi
import { Head, useForm } from '@inertiajs/react';
import '../../css/app.css'; // Pastikan Tailwind CSS di-import

export default function Order() {
    // useForm untuk mengelola state form dan submit via Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: '',
        customer_contact: '',
        product_details: [{ name: '', qty: 1 }], // Default 1 item, nama produk akan diinput manual
        notes: '',
    });

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...data.product_details];
        // Untuk input quantity, pastikan valuenya adalah angka
        newItems[index] = { ...newItems[index], [name]: name === 'qty' ? parseInt(value, 10) || 0 : value };
        setData('product_details', newItems);
    };

    const addItem = () => {
        setData('product_details', [...data.product_details, { name: '', qty: 1 }]);
    };

    const removeItem = (index) => {
        const newItems = data.product_details.filter((_, i) => i !== index);
        setData('product_details', newItems);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('order.store'), {
            onSuccess: () => reset(), // Reset form on success
        });
    };

    return (
        <>
            <Head title="Pemesanan" />
            <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl mx-auto w-full">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Formulir Pemesanan</h2>
                    <form onSubmit={submit} className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-md">
                        {/* Nama & Kontak */}
                        <div>
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Nama Anda</label>
                            <input
                                type="text"
                                id="customer_name"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.customer_name && <div className="text-red-500 text-sm mt-1">{errors.customer_name}</div>}
                        </div>
                        <div>
                            <label htmlFor="customer_contact" className="block text-sm font-medium text-gray-700">Nomor Telepon/WhatsApp</label>
                            <input
                                type="text"
                                id="customer_contact"
                                value={data.customer_contact}
                                onChange={(e) => setData('customer_contact', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.customer_contact && <div className="text-red-500 text-sm mt-1">{errors.customer_contact}</div>}
                        </div>

                        {/* Bagian Detail Produk */}
                        <h3 className="text-xl font-semibold mt-6 mb-4">Detail Produk</h3>
                        {data.product_details.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 items-end mb-4 bg-gray-100 p-4 rounded-md">
                                <div className="flex-grow">
                                    <label htmlFor={`product_name_${index}`} className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                    <input
                                        type="text"
                                        id={`product_name_${index}`}
                                        name="name" // Pastikan name sesuai dengan field di state product_details
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, e)}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Masukkan nama produk"
                                    />
                                    {errors[`product_details.${index}.name`] && (
                                        <div className="text-red-500 text-sm mt-1">{errors[`product_details.${index}.name`]}</div>
                                    )}
                                </div>
                                <div className="w-full md:w-32"> {/* Lebar disesuaikan */}
                                    <label htmlFor={`quantity_${index}`} className="block text-sm font-medium text-gray-700">Jumlah</label>
                                    <input
                                        type="number"
                                        id={`quantity_${index}`}
                                        name="qty" // Pastikan name sesuai dengan field di state product_details
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(index, e)}
                                        required
                                        min="1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors[`product_details.${index}.qty`] && (
                                        <div className="text-red-500 text-sm mt-1">{errors[`product_details.${index}.qty`]}</div>
                                    )}
                                </div>
                                {data.product_details.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-center md:self-end" // Penyesuaian alignment
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItem}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                        >
                            Tambah Produk Lain
                        </button>

                        {/* Catatan Tambahan */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
                            <textarea
                                id="notes"
                                rows="2"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                            {errors.notes && <div className="text-red-500 text-sm mt-1">{errors.notes}</div>}
                        </div>

                        {/* Tombol Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {processing ? 'Mengirim Pesanan...' : 'Kirim Pesanan'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}