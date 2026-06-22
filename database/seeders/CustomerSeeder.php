<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        if (Customer::count() == 0) {
            Customer::factory()->count(15)->create(); // Buat 15 customer dummy
        }
    }
}