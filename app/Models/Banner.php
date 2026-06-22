<?php

namespace App\Models;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        // 'title',         // Uncomment jika Anda menambahkannya di migrasi
        // 'description',   // Uncomment jika Anda menambahkannya di migrasi
        // 'link_url',      // Uncomment jika Anda menambahkannya di migrasi
        // 'is_active',     // Uncomment jika Anda menambahkannya di migrasi
    ];

    /**
     * The "booted" method of the model.
     * Digunakan untuk event listener, seperti menghapus file saat record model dihapus.
     */
    protected static function booted(): void
    {
        // static::deleting(function (Banner $banner) {
        //     // Hapus file foto dari storage jika ada dan record banner dihapus
        //     if ($banner->photo && Storage::disk('public')->exists($banner->photo)) {
        //         Storage::disk('public')->delete($banner->photo);
        //     }
        // });
    }

    /**
     * Accessor untuk mendapatkan URL lengkap foto.
     * Asumsi 'photo' menyimpan path relatif di dalam disk 'public'.
     */

}
