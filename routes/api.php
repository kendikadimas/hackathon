<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestimonialController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/testimonials', [TestimonialController::class, 'index']);
// Route ini opsional jika kamu membuat halaman admin sederhana untuk UMKM
Route::post('/testimonials', [TestimonialController::class, 'store']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
