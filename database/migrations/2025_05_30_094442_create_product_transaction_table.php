<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_transaction', function (Blueprint $table) {
            $table->id(); // Primary key untuk tabel pivot

            $table->foreignId('transaction_id')
                  ->constrained('transactions')
                  ->onUpdate('cascade')
                  ->onDelete('cascade'); // Jika transaksi dihapus, entri pivot ini juga dihapus

            $table->foreignId('product_id')
                  ->constrained('products')
                  ->onUpdate('cascade')
                  ->onDelete('cascade'); // Jika produk dihapus, entri pivot ini juga dihapus

            $table->integer('quantity')->default(1); // Jumlah produk dalam transaksi ini
            $table->decimal('unit_price', 10, 2); // Harga satuan produk pada saat transaksi

            // Anda bisa menambahkan kolom lain jika perlu, misal diskon per item
            // $table->decimal('discount_per_item', 10, 2)->default(0);

            $table->timestamps(); // Opsional, tapi bisa berguna untuk melacak kapan item ditambahkan

            // Membuat unique constraint untuk kombinasi transaction_id dan product_id
            // agar satu produk tidak bisa ditambahkan dua kali dalam transaksi yang sama (kecuali Anda ingin kasus itu)
            // $table->unique(['transaction_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_transaction');
    }
};