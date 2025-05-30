<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmkmPaymentDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'umkm_id',
        'bank_name',
        'account_number',
        'account_holder_name',
        'qris_image_url',
    ];

    // Jika Anda punya model Umkm, tambahkan relasi
    // public function umkm()
    // {
    //     return $this->belongsTo(Umkm::class);
    // }
}