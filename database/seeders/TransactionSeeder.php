<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan CustomerSeeder dan ProductSeeder sudah dijalankan sebelumnya
        // Factory akan menangani pemilihan customer dan penambahan produk ke transaksi
        Transaction::factory()->count(50)->create(); // Buat 50 transaksi dummy
    }
}