<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // Penting untuk manajemen file

class Testimonial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'author',
        'content',
        'photo_path', // Disesuaikan dengan nama kolom di migrasi
    ];

    /**
     * The "booted" method of the model.
     * Digunakan untuk event listener, seperti menghapus file saat record model dihapus.
     */
    // protected static function booted(): void
    // {
    //     static::deleting(function (Testimonial $testimonial) {
    //         // Hapus file foto dari storage jika ada dan record testimoni dihapus
    //         if ($testimonial->photo_path && Storage::disk('public')->exists($testimonial->photo_path)) {
    //             Storage::disk('public')->delete($testimonial->photo_path);
    //         }
    //     });
    // }

    // /**
    //   Accessor untuk mendapatkan URL lengkap foto.
    //   Asumsi 'photo_path' menyimpan path relatif di dalam disk 'public'.
    //  
    // public function getPhotoUrlAttribute(): ?string
    // {
    //     if ($this->photo_path && Storage::disk('public')->exists($this->photo_path)) {
    //         return Storage::disk('public')->url($this->photo_path);
    //     }
    //     // Anda bisa mengembalikan URL gambar placeholder jika foto tidak ada
    //     // return asset('images/avatar_placeholder.png');
    //     return null;
    // }
}