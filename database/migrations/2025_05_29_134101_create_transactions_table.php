<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id(); // Kolom id (Primary Key, Auto Increment)

            // Foreign key ke tabel customers (sesuaikan nama tabel jika berbeda)
            $table->foreignId('cust_id')
                  ->constrained('customers') // Asumsi tabel 'customers' ada
                  ->onUpdate('cascade')
                  ->onDelete('restrict'); // Atau 'cascade', 'set null' sesuai kebutuhan

            $table->string('code')->unique(); // Kode transaksi, unik
            $table->string('name'); // Nama pelanggan (bisa diambil dari customer, atau diinput manual)
            $table->string('phone')->nullable(); // Nomor telepon pelanggan
            
            // payment_model bisa berupa string atau enum jika pilihannya terbatas            
            $table->decimal('total_price', 15, 2); // Total harga, 15 digit total, 2 digit desimal
            
            // status bisa berupa string atau enum
            $table->string('status', 50)->default('pending'); // Contoh: 'pending', 'paid', 'failed', 'completed', 'cancelled'
            
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};