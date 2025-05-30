<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Inertia tidak lagi digunakan di sini untuk Blade
// use Inertia\Inertia;

class ProductController extends Controller
{
    // Method untuk Inertia (jika masih ada)
    // public function showBestSellers() { ... }

    // Method baru untuk Blade view
    public function showBestSellersBlade()
    {
        $bestSellerDishes = [
            [
                'id' => 1,
                'imageUrl' => 'images/placeholder-dish-1.jpg', // Path relatif dari folder public
                'name' => 'Salad Sehat Pagi Hari',
                'price' => 230,
                'rating' => 5,
                'buyUrl' => '#'
            ],
            [
                'id' => 2,
                'imageUrl' => 'images/placeholder-dish-2.jpg',
                'name' => 'Sarapan Energi Tinggi',
                'price' => 230,
                'rating' => 5,
                'buyUrl' => '#'
            ],
            [
                'id' => 3,
                'imageUrl' => 'images/placeholder-dish-3.jpg',
                'name' => 'Ayam Panggang Spesial',
                'price' => 230,
                'rating' => 4,
                'buyUrl' => '#'
            ],
            [
                'id' => 4,
                'imageUrl' => 'images/placeholder-dish-4.jpg',
                'name' => 'Piring Buah Segar',
                'price' => 230,
                'rating' => 5,
                'buyUrl' => '#'
            ],
            [
                'id' => 5,
                'imageUrl' => 'images/placeholder-dish-5.jpg',
                'name' => 'Salmon & Sayuran Organik',
                'price' => 230,
                'rating' => 5,
                'buyUrl' => '#'
            ],
            [
                'id' => 6,
                'imageUrl' => 'images/placeholder-dish-6.jpg',
                'name' => 'Nasi Goreng Kampung Juara',
                'price' => 230,
                'rating' => 3,
                'buyUrl' => '#'
            ],
        ];

        $pageTitle = "Our best Seller Dishes 🔥🔥";
        $pageSubtitle = "Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce, juicy tomatoe all tossed in your choice of dressing.";

        // Menggunakan view() helper untuk Blade
        return view('products.best_sellers', [
            'bestSellerDishes' => $bestSellerDishes,
            'pageTitle' => $pageTitle,
            'pageSubtitle' => $pageSubtitle,
        ]);
    }
}