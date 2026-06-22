<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product; // Import Product
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        $customer = Customer::inRandomOrder()->first() ?? Customer::factory()->create(); // Pastikan customer ada
        $statuses = ['pending', 'paid', 'processing', 'completed', 'failed', 'cancelled'];
        $transactionDate = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'cust_id' => $customer->id,
            'code' => 'INV-' . strtoupper(Str::random(3)) . $this->faker->unique()->randomNumber(6, true),
            'name' => $customer->name,
            'phone' => $customer->phone,
            // 'payment_model' => $this->faker->randomElement(['cash', 'transfer']), // Jika ada
            'total_price' => 0, // Akan dihitung dan diupdate setelah produk ditambahkan
            'status' => $this->faker->randomElement($statuses),
            'created_at' => $transactionDate,
            'updated_at' => $this->faker->dateTimeBetween($transactionDate, 'now'),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Transaction $transaction) {
            // Pastikan ada produk di database untuk dipilih
            if (Product::count() == 0) {
                Product::factory()->count(10)->create(); // Buat beberapa produk jika belum ada
            }

            // Tambahkan 1 sampai 5 produk acak ke transaksi ini
            $productsToAttach = Product::inRandomOrder()
                                    ->limit($this->faker->numberBetween(1, 5))
                                    ->get();

            $calculatedTotalPrice = 0;

            foreach ($productsToAttach as $product) {
                $quantity = $this->faker->numberBetween(1, 3);
                // Gunakan harga produk saat ini sebagai harga satuan untuk kesederhanaan
                // Anda bisa menambahkan variasi jika diperlukan
                $unitPrice = $product->price;

                $transaction->products()->attach($product->id, [
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'created_at' => $transaction->created_at, // Sesuaikan dengan tanggal transaksi
                    'updated_at' => $transaction->updated_at,
                ]);

                $calculatedTotalPrice += ($quantity * $unitPrice);
            }

            // Update total_price transaksi berdasarkan produk yang ditambahkan
            if ($calculatedTotalPrice > 0) {
                $transaction->total_price = $calculatedTotalPrice;
                $transaction->saveQuietly(); // saveQuietly untuk menghindari trigger event model jika ada
            }
        });
    }
}