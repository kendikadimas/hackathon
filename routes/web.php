<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CashflowController;
use App\Http\Controllers\ProductController;

// Hapus ini jika TestimonialController@index sudah merender welcome
// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Ini yang akan me-load halaman utama dengan testimoni (asumsikan dia merender Welcome.jsx/tsx)
Route::get('/', [TestimonialController::class, 'index'])->name('home'); // Tambahkan name 'home' di sini
Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store'); // Untuk submit testimoni (jika ada form)
Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index'); // <-- TAMBAHKAN INI


Route::get('/order', [OrderController::class, 'create'])->name('order.create');
Route::post('/order', [OrderController::class, 'store'])->name('order.store');
Route::get('/order/success', [OrderController::class, 'success'])->name('order.success');


// Route untuk halaman admin cashflow (yang akan dirender oleh Inertia)
Route::get('/admin/cashflow', [CashflowController::class, 'index'])->name('admin.cashflow.index');
Route::post('/admin/cashflow', [CashflowController::class, 'store'])->name('admin.cashflow.store');

// Route untuk download laporan (tidak perlu Inertia untuk ini)
Route::get('/admin/cashflow/export/pdf', [CashflowController::class, 'exportPdf'])->name('admin.cashflow.export.pdf');
Route::get('/admin/cashflow/export/excel', [CashflowController::class, 'exportExcel'])->name('admin.cashflow.export.excel');

// Route untuk menampilkan daftar produk
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// Route untuk menampilkan detail produk tunggal
// Perhatikan {product} di URL, ini yang digunakan oleh Route Model Binding
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';