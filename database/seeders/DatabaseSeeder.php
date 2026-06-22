<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,  // 1. Buat Customers dulu
            ProductSeeder::class,   // 2. Buat Products
            TransactionSeeder::class, // 3. Baru buat Transactions yang merujuk ke Customers dan Products
            // Daftarkan seeder lain di sini jika ada
        ]);
    }
}
