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
        Schema::create('faqs', function (Blueprint $table) {
           $table->id(); // Kolom id (Primary Key, Auto Increment)
            $table->text('question'); // Kolom untuk pertanyaan, tipe TEXT untuk teks yang lebih panjang
            $table->text('answer');   // Kolom untuk jawaban, tipe TEXT
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
