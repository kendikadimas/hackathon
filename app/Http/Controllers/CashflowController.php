<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia; // Import Inertia
use Barryvdh\DomPDF\Facade\Pdf; // Untuk PDF
use PhpOffice\PhpSpreadsheet\Spreadsheet; // Untuk Excel
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class CashflowController extends Controller
{
    // Menampilkan halaman admin cashflow dengan data
    public function index(Request $request)
    {
        $query = Transaction::query();
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('transaction_date', [$startDate, $endDate]);
        }

        $transactions = $query->orderBy('transaction_date', 'desc')->get();

        // Kirim data ke komponen React
        return Inertia::render('Admin/Cashflow', [
            'transactions' => $transactions,
            'filterDates' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }

    // Menyimpan transaksi baru (pemasukan/pengeluaran)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'transaction_date' => 'required|date',
        ]);

        Transaction::create($validatedData);

        // Redirect kembali ke halaman cashflow admin untuk refresh data
        return redirect()->route('admin.cashflow.index')->with('message', 'Transaksi berhasil ditambahkan!');
    }

    // --- Fitur Laporan PDF ---
    public function exportPdf(Request $request)
    {
        $query = Transaction::query();
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('transaction_date', [$startDate, $endDate]);
        }

        $transactions = $query->orderBy('transaction_date', 'asc')->get();

        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        $netCashflow = $totalIncome - $totalExpense;

        $data = [
            'transactions' => $transactions,
            'startDate' => $startDate ? Carbon::parse($startDate)->format('d F Y') : 'Awal',
            'endDate' => $endDate ? Carbon::parse($endDate)->format('d F Y') : 'Sekarang',
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'netCashflow' => $netCashflow,
        ];

        // Render Blade view untuk PDF
        $pdf = Pdf::loadView('reports.cashflow_pdf', $data);
        return $pdf->download('laporan_cashflow_' . date('Ymd') . '.pdf');
    }

    // --- Fitur Laporan Excel ---
    public function exportExcel(Request $request)
    {
        $query = Transaction::query();
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('transaction_date', [$startDate, $endDate]);
        }

        $transactions = $query->orderBy('transaction_date', 'asc')->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Laporan Cashflow');

        // Header
        $sheet->setCellValue('A1', 'Deskripsi');
        $sheet->setCellValue('B1', 'Jumlah');
        $sheet->setCellValue('C1', 'Tipe');
        $sheet->setCellValue('D1', 'Tanggal');

        // Data
        $row = 2;
        foreach ($transactions as $transaction) {
            $sheet->setCellValue('A' . $row, $transaction->description);
            $sheet->setCellValue('B' . $row, $transaction->amount);
            $sheet->setCellValue('C' . $row, ucfirst($transaction->type));
            $sheet->setCellValue('D' . $row, $transaction->transaction_date->format('d M Y'));
            $row++;
        }

        // Summary
        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        $netCashflow = $totalIncome - $totalExpense;

        $sheet->setCellValue('A' . ($row + 2), 'Total Pemasukan:');
        $sheet->setCellValue('B' . ($row + 2), $totalIncome);
        $sheet->setCellValue('A' . ($row + 3), 'Total Pengeluaran:');
        $sheet->setCellValue('B' . ($row + 3), $totalExpense);
        $sheet->setCellValue('A' . ($row + 4), 'Cashflow Bersih:');
        $sheet->setCellValue('B' . ($row + 4), $netCashflow);


        $writer = new Xlsx($spreadsheet);
        $fileName = 'laporan_cashflow_' . date('Ymd_His') . '.xlsx';
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="' . urlencode($fileName) . '"');
        $writer->save('php://output');
        exit;
    }
}