<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            
            // Foreign key ke tabel customers
            $table->foreignId('customer_id')
                  ->constrained('customers')
                  ->onUpdate('cascade')
                  ->onDelete('restrict');
            
            $table->string('code')->unique();
            $table->decimal('total_price', 15, 2);
            $table->string('status', 50)->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};