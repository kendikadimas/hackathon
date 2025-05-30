<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image_url',
        // 'umkm_id', // Uncomment this if you have a 'umkm_id' column
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2', // Pastikan harga di-cast sebagai desimal
        'stock' => 'integer',   // Pastikan stok di-cast sebagai integer
    ];

    // Jika Anda memiliki relasi dengan model UMKM
    // public function umkm()
    // {
    //     return $this->belongsTo(Umkm::class);
    // }
}