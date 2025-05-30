<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umkm_payment_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained('umkms')->onDelete('cascade'); // Jika ada tabel UMKM
            $table->string('bank_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_holder_name')->nullable();
            $table->string('qris_image_url')->nullable(); // URL gambar QRIS
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umkm_payment_details');
    }
};