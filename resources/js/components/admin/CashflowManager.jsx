// resources/js/components/admin/CashflowManager.jsx
import React, { useState, useEffect } from 'react';

const CashflowManager = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'income',
        transaction_date: new Date().toISOString().slice(0, 10), // Tanggal hari ini
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterDates, setFilterDates] = useState({
        start_date: '',
        end_date: '',
    });

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const query = new URLSearchParams(filterDates).toString();
            const response = await fetch(`/api/cashflow?${query}`);
            if (!response.ok) throw new Error('Failed to fetch transactions');
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [filterDates]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterDates(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/cashflow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menambah transaksi');
            }
            setFormData({
                description: '',
                amount: '',
                type: 'income',
                transaction_date: new Date().toISOString().slice(0, 10),
            });
            fetchTransactions(); // Refresh list
        } catch (err) {
            setError(err.message);
        }
    };

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const netCashflow = totalIncome - totalExpense;

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manajemen Cashflow UMKM</h1>

            {/* Form Tambah Transaksi */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Tambah Transaksi Baru</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah</label>
                        <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipe</label>
                        <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                            <option value="income">Pemasukan</option>
                            <option value="expense">Pengeluaran</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700">Tanggal</label>
                        <input type="date" name="transaction_date" id="transaction_date" value={formData.transaction_date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    <div className="col-span-full">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Tambah Transaksi</button>
                    </div>
                </form>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>

            {/* Filter Tanggal */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Filter Transaksi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Dari Tanggal</label>
                        <input type="date" name="start_date" id="start_date" value={filterDates.start_date} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Sampai Tanggal</label>
                        <input type="date" name="end_date" id="end_date" value={filterDates.end_date} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    <div className="col-span-full flex justify-end space-x-2 mt-4">
                        <a href={`/admin/cashflow/export/pdf?start_date=<span class="math-inline">\{filterDates\.start\_date\}&end\_date\=</span>{filterDates.end_date}`} target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /><path fillRule="evenodd" d="M8 12a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1-7a1 1 0 011 1v.5a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            Cetak PDF
                        </a>
                        <a href={`/admin/cashflow/export/excel?start_date=<span class="math-inline">\{filterDates\.start\_date\}&end\_date\=</span>{filterDates.end_date}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center">
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
                {loading ? (
                    <p>Memuat transaksi...</p>
                ) : transactions.length === 0 ? (
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
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
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
    );
};

export default CashflowManager;