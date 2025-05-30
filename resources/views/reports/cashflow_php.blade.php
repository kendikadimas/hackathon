<!DOCTYPE html>
<html>
<head>
    <title>Laporan Cashflow UMKM</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .summary { margin-top: 30px; }
        .summary p { margin: 5px 0; }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Laporan Cashflow UMKM</h1>
    <p style="text-align: center;">Periode: {{ $startDate }} - {{ $endDate }}</p>

    <table>
        <thead>
            <tr>
                <th>Deskripsi</th>
                <th>Jumlah</th>
                <th>Tipe</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->description }}</td>
                    <td>Rp {{ number_format($transaction->amount, 0, ',', '.') }}</td>
                    <td>{{ ucfirst($transaction->type) }}</td>
                    <td>{{ $transaction->transaction_date->format('d M Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <p><strong>Total Pemasukan:</strong> Rp {{ number_format($totalIncome, 0, ',', '.') }}</p>
        <p><strong>Total Pengeluaran:</strong> Rp {{ number_format($totalExpense, 0, ',', '.') }}</p>
        <p><strong>Cashflow Bersih:</strong> Rp {{ number_format($netCashflow, 0, ',', '.') }}</p>
    </div>
</body>
</html>