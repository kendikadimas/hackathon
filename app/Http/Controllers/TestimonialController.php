<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class TestimonialController extends Controller
{
    public function index()
    {
        // Ambil semua testimoni, atau beberapa saja (misal 3-5 yang terbaru)
        // Ambil testimoni terbaru, misal 5 saja
        $testimonials = Testimonial::latest()->take(5)->get();

        // >>> UNCOMMENT BAGIAN INI UNTUK DATA DUMMY CEPAT UNTUK PENGUJIAN <<<
        // $testimonials = collect([
        //      (object)['id' => 1, 'content' => 'Produk UMKM ini sangat berkualitas dan harganya terjangkau!', 'author' => 'Budi Santoso'],
        //      (object)['id' => 2, 'content' => 'Pelayanan cepat dan ramah, saya sangat merekomendasikan!', 'author' => 'Siti Aminah'],
        //      (object)['id' => 3, 'content' => 'Sangat membantu UMKM lokal, saya bangga membeli produk mereka.', 'author' => 'Joko Susilo'],
        //      (object)['id' => 4, 'content' => 'Produknya berkualitas tinggi, saya sangat puas dengan pengalaman belanja di UMKM ini.', 'author' => 'Rudi Santoso'],
        //      (object)['id' => 5, 'content' => 'Pelayanannya ramah dan profesional, saya sangat puas dengan pengalaman belanja di UMKM ini.', 'author' => 'Siti Aminah'],
        // ]);
        // >>> HAPUS ATAU KOMENTARI KEMBALI SETELAH PENGUJIAN BERHASIL <<<


        // Kirim data testimoni ke komponen React melalui Inertia
        return Inertia::render('Welcome', [ // 'Welcome' adalah nama komponen React
            'testimonials' => $testimonials,
        ]);
    }

    // Jika UMKM ingin menambah testimoni via admin sederhana (opsional untuk hackathon 5 jam)
    // Untuk menambah testimoni (jika ada fitur admin)
    public function store(Request $request)
    {
       // 1. Validasi data yang masuk
        $validatedData = $request->validate([
            'author' => 'required|string|max:255',
            'content' => 'required|string|min:10|max:1000', // Contoh validasi min/max
        ], [
            'author.required' => 'Nama Anda wajib diisi.',
            'content.required' => 'Isi testimoni wajib diisi.',
            'content.min' => 'Testimoni minimal 10 karakter.',
            'content.max' => 'Testimoni maksimal 1000 karakter.',
        ]);

        // 2. Simpan testimoni baru ke database
        Testimonial::create($validatedData);

        // 3. Respon ke frontend
        // Inertia otomatis akan menangani redirect setelah POST berhasil
        // Jika Anda ingin redirect ke halaman yang sama dengan pesan sukses:
        return Redirect::back()->with('success', 'Terima kasih! Testimoni Anda berhasil dikirim.');

        // Atau jika ingin redirect ke halaman lain (misal: halaman "Testimoni Berhasil"):
        // return Redirect::route('home')->with('success', 'Testimoni Anda berhasil dikirim.');
    }
}
