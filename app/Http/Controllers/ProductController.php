<?php

namespace App\Http\Controllers;

use App\Models\Product; // Pastikan Anda mengimpor model Product
use Illuminate\Http\Request;
use Inertia\Inertia; // Pastikan Anda mengimpor Inertia

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        // Ambil semua produk dari database
        // Anda bisa menambahkan paginasi, filter, atau order by di sini
        $products = Product::all();

        // Kirim data produk ke komponen React melalui Inertia
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        // Karena kita menggunakan Route Model Binding (Product $product),
        // Laravel secara otomatis akan mencari produk berdasarkan ID yang diberikan
        // dan menginjeksikannya ke dalam variabel $product.

        // Kirim detail produk ke komponen React melalui Inertia
        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    // --- Opsional: Metode untuk manajemen produk (CRUD) ---
    // Jika Anda ingin menambahkan fitur membuat, mengedit, atau menghapus produk
    // Anda bisa menambahkan metode 'create', 'store', 'edit', 'update', 'destroy' di sini.

    /**
     * Show the form for creating a new product.
     */
    // public function create()
    // {
    //     return Inertia::render('Product/Create');
    // }

    /**
     * Store a newly created product in storage.
     */
    // public function store(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'nullable|string',
    //         'price' => 'required|numeric|min:0',
    //         'stock' => 'required|integer|min:0',
    //         'image_url' => 'nullable|url|max:255',
    //     ]);

    //     Product::create($validatedData);

    //     return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan.');
    // }

    /**
     * Show the form for editing the specified product.
     */
    // public function edit(Product $product)
    // {
    //     return Inertia::render('Product/Edit', [
    //         'product' => $product,
    //     ]);
    // }

    /**
     * Update the specified product in storage.
     */
    // public function update(Request $request, Product $product)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'nullable|string',
    //         'price' => 'required|numeric|min:0',
    //         'stock' => 'required|integer|min:0',
    //         'image_url' => 'nullable|url|max:255',
    //     ]);

    //     $product->update($validatedData);

    //     return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui.');
    // }

    /**
     * Remove the specified product from storage.
     */
    // public function destroy(Product $product)
    // {
    //     $product->delete();

    //     return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus.');
    // }
}