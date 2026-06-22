<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialEntry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'type',
        'amount',
        'entry_date',
        'reference',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'entry_date' => 'datetime', // Atau 'date' jika Anda hanya menyimpan tanggal
    ];

    // Anda bisa menambahkan konstanta untuk tipe agar lebih mudah digunakan
    public const TYPE_INCOME = 'income';
    public const TYPE_EXPENSE = 'expense';
}