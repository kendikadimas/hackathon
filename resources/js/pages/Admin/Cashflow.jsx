import React, { useState, useEffect } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react'; // <<< TAMBAHKAN usePage di sini
import '../../../css/app.css'; // Pastikan Tailwind CSS di-import

export default function Cashflow({ transactions, filterDates: initialFilterDates }) {
    // Ambil flash messages dari props Inertia menggunakan usePage()
    const flash = usePage().props?.flash; // <<< PERBAIKAN DI SINI

    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
        amount: '',
        type: 'income', // Perhatikan: di DB Anda type adalah ENUM('inflow', 'outflow'), di sini 'income'/'expense'
        transaction_date: new Date().toISOString().slice(0, 10),
    });

    // State untuk filter tanggal, diinisialisasi dari props
    const [filterDates, setFilterDates] = useState(initialFilterDates);

    // Fungsi untuk menerapkan filter (Inertia visit)
    const applyFilter = () => {
        router.get(route('admin.cashflow.index'), filterDates, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        // Hapus atau komentari bagian ini jika Anda tidak ingin filter otomatis setiap kali `filterDates` berubah
        // Ini cenderung menyebabkan loop atau banyak request jika tidak di-debounce
        // if (filterDates.start_date !== initialFilterDates.start_date ||
        //     filterDates.end_date !== initialFilterDates.end_date) {
        //     // Jika ingin otomatis apply saat berubah, pastikan ada debounce
        //     // Atau, cukup panggil applyFilter secara manual dengan tombol
        // }
    }, [filterDates]); // Dependensi filterDates

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterDates(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.cashflow.store'), {
            onSuccess: () => {
                reset(); // Reset form
                router.reload({ preserveState: true }); // Reload halaman untuk update data
            },
            onError: (err) => {
                console.error("Error submitting transaction:", err);
            },
        });
    };

    // PERHATIAN: Di DB Anda menggunakan 'inflow' dan 'outflow'
    // Pastikan ini sesuai dengan apa yang disimpan di database
    const totalIncome = transactions.filter(t => t.type === 'inflow').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === 'outflow').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const netCashflow = totalIncome - totalExpense;

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <>
            <Head title="Manajemen Cashflow" />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Manajemen Cashflow UMKM</h1>

                {/* Form Tambah Transaksi */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Tambah Transaksi Baru</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                            <input type="text" name="description" id="description" value={data.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah</label>
                            <input type="number" name="amount" id="amount" value={data.amount} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipe</label>
                            {/* PERHATIAN: Pilihan di sini harus sesuai dengan ENUM di database ('inflow', 'outflow') */}
                            <select name="type" id="type" value={data.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                                <option value="inflow">Pemasukan</option> {/* Ubah dari 'income' */}
                                <option value="outflow">Pengeluaran</option> {/* Ubah dari 'expense' */}
                            </select>
                            {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                        </div>
                        <div>
                            <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700">Tanggal</label>
                            <input type="date" name="transaction_date" id="transaction_date" value={data.transaction_date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                            {errors.transaction_date && <div className="text-red-500 text-sm mt-1">{errors.transaction_date}</div>}
                        </div>
                        <div className="col-span-full">
                            <button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Tambah Transaksi'}
                            </button>
                        </div>
                    </form>
                    {/* Session message dari Laravel */}
                    {/* Menggunakan flash?.message lebih aman */}
                    {flash?.message && <p className="mt-4 text-center text-green-600">{flash.message}</p>}
                </div>

                {/* Filter Tanggal */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Filter Transaksi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Dari Tanggal</label>
                            <input type="date" name="start_date" id="start_date" value={filterDates.start_date || ''} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                        </div>
                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Sampai Tanggal</label>
                            <input type="date" name="end_date" id="end_date" value={filterDates.end_date || ''} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                        </div>
                        <div className="col-span-full flex justify-end space-x-2 mt-4">
                            <button onClick={applyFilter} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                                Terapkan Filter
                            </button>
                            <a href={route('admin.cashflow.export.pdf', filterDates)} target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /><path fillRule="evenodd" d="M8 12a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1-7a1 1 0 011 1v.5a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Cetak PDF
                            </a>
                            <a href={route('admin.cashflow.export.excel', filterDates)} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H5zm-1 3v10h12V7.414L10.586 4H5zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1-3a1 1 0 011 1v.5a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Cetak Excel
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Cashflow */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Ringkasan Cashflow</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-green-100 rounded-md">
                            <p className="text-lg text-green-700">Total Pemasukan</p>
                            <p className="text-2xl font-bold text-green-800">{formatRupiah(totalIncome)}</p>
                        </div>
                        <div className="p-4 bg-red-100 rounded-md">
                            <p className="text-lg text-red-700">Total Pengeluaran</p>
                            <p className="text-2xl font-bold text-red-800">{formatRupiah(totalExpense)}</p>
                        </div>
                        <div className="p-4 bg-blue-100 rounded-md">
                            <p className="text-lg text-blue-700">Cashflow Bersih</p>
                            <p className="text-2xl font-bold text-blue-800">{formatRupiah(netCashflow)}</p>
                        </div>
                    </div>
                </div>

                {/* Daftar Transaksi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Daftar Transaksi</h2>
                    {transactions.length === 0 ? (
                        <p>Tidak ada transaksi untuk periode ini.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((t) => (
                                        <tr key={t.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(t.transaction_date).toLocaleDateString('id-ID')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'inflow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {t.type === 'inflow' ? 'Pemasukan' : 'Pengeluaran'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{formatRupiah(t.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}