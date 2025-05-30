<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        if (Product::count() == 0) {
            Product::factory()->count(30)->create(); // Buat 30 produk dummy
        }
    }
}