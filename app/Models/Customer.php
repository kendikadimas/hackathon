<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // Tambahkan ini jika belum ada

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        // 'address', // Jika Anda menambahkan kolom address
    ];

    /**
     * Get all of the transactions for the Customer.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'cust_id');
    }
}