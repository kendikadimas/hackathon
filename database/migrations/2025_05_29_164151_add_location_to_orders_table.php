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
        Schema::table('orders', function (Blueprint $table) {
            $table->text('delivery_address')->nullable()->after('notes'); // Alamat lengkap
            $table->decimal('delivery_latitude', 10, 7)->nullable()->after('delivery_address'); // Latitude
            $table->decimal('delivery_longitude', 10, 7)->nullable()->after('delivery_latitude'); // Longitude
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['delivery_address', 'delivery_latitude', 'delivery_longitude']);
        });
    }
};
