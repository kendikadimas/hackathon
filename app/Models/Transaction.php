<?php

namespace App\Models;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; // Tambahkan ini

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'cust_id',
        'code',
        'name',
        'phone',
        // 'payment_model', // Jika Anda menambahkannya nanti
        'total_price',
        'status',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the customer that owns the transaction.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'cust_id');
    }

    /**
     * The products that belong to the transaction.
     * Mendefinisikan relasi many-to-many dengan Product melalui tabel product_transaction.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_transaction')
                    ->withPivot('quantity', 'unit_price') // Mengambil data dari kolom pivot
                    ->withTimestamps(); // Jika tabel pivot Anda memiliki timestamps
    }

    // app/Models/Testimonial.php
public function getPhotoUrlAttribute(): ?string
{
    if ($this->photo_path && Storage::disk('public')->exists($this->photo_path)) {
        // $this->photo_path seharusnya adalah 'testimonial-photos/namafile.jpg'
        return Storage::disk('public')->url($this->photo_path);
    }
    return null;
}
}