<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use App\Models\Transaction;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1; // Urutan widget di dashboard, angka kecil lebih atas

    protected function getStats(): array
    {
        // 1. Total Pendapatan
        // Asumsikan pendapatan dihitung dari transaksi yang statusnya 'completed' atau 'paid'
        $totalPendapatan = Transaction::whereIn('status', ['completed', 'paid'])
            ->sum('total_price');

        // 2. Total Transaksi
        // Jumlah semua transaksi yang tercatat
        $totalTransaksi = Transaction::count();

        // 3. Jumlah Customer
        // Jumlah semua customer yang terdaftar
        $jumlahCustomer = Customer::count();

        return [
            Stat::make('Total Pendapatan', 'Rp ' . number_format($totalPendapatan, 0, ',', '.'))
                ->description('Dari transaksi berhasil')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]), // Contoh data chart (opsional)
            Stat::make('Total Transaksi', $totalTransaksi)
                ->description('Semua transaksi tercatat')
                ->descriptionIcon('heroicon-m-receipt-refund')
                ->color('info')
                ->chart([17, 14, 4, 15, 3, 10, 2]), // Contoh data chart (opsional)
            Stat::make('Jumlah Customer', $jumlahCustomer)
                ->description('Pelanggan terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('warning')
                ->chart([2, 10, 3, 15, 4, 17, 7]), // Contoh data chart (opsional)
        ];
    }
}