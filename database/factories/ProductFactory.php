<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(rand(2, 4), true), // Nama produk dari 2-4 kata
            'description' => $this->faker->sentence(rand(10, 20)),
            'price' => $this->faker->randomFloat(2, 5000, 1000000), // Harga antara 5rb - 1jt
            'stock' => $this->faker->numberBetween(0, 200),
            'image_path' => null, // Anda bisa menambahkan path gambar dummy jika mau
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}