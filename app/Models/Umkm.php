<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner_name',
        'contact_person',
        'address',
        'logo_url',
        'description',
        // 'user_id', // Uncomment jika ada relasi dengan user
    ];

    // Jika Anda punya relasi dengan Product
    // public function products()
    // {
    //     return $this->hasMany(Product::class);
    // }

    // Jika Anda punya relasi dengan UmkmPaymentDetail
    // public function paymentDetails()
    // {
    //     return $this->hasMany(UmkmPaymentDetail::class);
    // }

    // Jika Anda punya relasi dengan User
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}