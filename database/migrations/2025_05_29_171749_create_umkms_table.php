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
        Schema::create('umkms', function (Blueprint $table) {
            $table->id(); // Primary Key, Auto Increment
            $table->string('name'); // Nama UMKM
            $table->string('owner_name')->nullable(); // Nama pemilik UMKM
            $table->string('contact_person')->nullable(); // Nomor telepon/email kontak UMKM
            $table->text('address')->nullable(); // Alamat fisik UMKM
            $table->string('logo_url')->nullable(); // URL logo UMKM
            $table->text('description')->nullable(); // Deskripsi singkat UMKM
            // Jika UMKM terkait dengan user yang login (misal, admin UMKM)
            // $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps(); // created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};