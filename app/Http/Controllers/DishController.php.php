<?php
namespace App\Http\Controllers;

use App\Models\Product;

use Inertia\Inertia;

class DishController extends Controller
{
    public function index()
    {
        $products = Product::take(6)->get()->map(function ($product) {
            return [
                'title' => $product->name,
                'price' => $product->price,
                'rating' => 5, // bisa kamu ganti jika punya kolom rating di DB
                'image' => asset('storage/' . $product->image_path), // Pastikan gambar disimpan di storage
            ];
        });

        return Inertia::render('Dishes/Index', [
            'dishes' => $products,
        ]);
    }
}