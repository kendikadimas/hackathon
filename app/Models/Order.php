<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_name',
        'customer_contact',
        'product_details',
        'notes',
        'delivery_address',      // <<< Tambahkan
        'delivery_latitude',     // <<< Tambahkan
        'delivery_longitude',    // <<< Tambahkan
    ];

    protected $casts = [
        'product_details' => 'array', // Otomatis cast ke array/object
    ];
}