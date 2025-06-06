<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question',
        'answer',
        // 'is_active', // Uncomment jika Anda menambahkannya di migrasi
        // 'sort_order',// Uncomment jika Anda menambahkannya di migrasi
    ];

}
