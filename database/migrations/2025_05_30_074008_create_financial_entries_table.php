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
        Schema::create('financial_entries', function (Blueprint $table) {
            $table->id();
            $table->string('description'); // Deskripsi entri, mis: "Penjualan Produk X", "Biaya Listrik"
            $table->enum('type', ['income', 'expense']); // Jenis entri: pemasukan atau pengeluaran
            $table->decimal('amount', 15, 2); // Jumlah uang, selalu positif. Tipenya (income/expense) menentukan alirannya.
            $table->timestamp('entry_date'); // Tanggal dan waktu kejadian
            $table->string('reference')->nullable(); // Referensi opsional, mis: No. Invoice, ID Transaksi terkait
            $table->text('notes')->nullable(); // Catatan tambahan
            $table->timestamps(); // created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_entries');
    }
};