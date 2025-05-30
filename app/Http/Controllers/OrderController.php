<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\UmkmPaymentDetail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    // Menampilkan halaman formulir pemesanan
     public function create()
    {
        // Ambil semua produk yang tersedia untuk dipilih di form
        $products = Product::where('stock', '>', 0)->get(['id', 'name', 'price', 'stock']); // Ambil hanya produk yang stoknya > 0
        return Inertia::render('Order', [
            'products' => $products,
            // 'googleMapsApiKey' => env('Maps_API_KEY'), // Pastikan ini ada di .env
        ]);
    }

    // Menyimpan pesanan dan mengurangi stok
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_contact' => 'required|string|max:255',
            'product_details' => 'required|array',
            'product_details.*.product_id' => 'required|exists:products,id', // Harus ada ID produk yang valid
            'product_details.*.quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
            'delivery_address' => 'required|string|max:255', // Alamat pengantaran
            'delivery_latitude' => 'required|numeric',       // Latitude
            'delivery_longitude' => 'required|numeric',      // Longitude
        ]);

        DB::beginTransaction(); // Mulai transaksi database untuk stok dan order

        try {
            $totalAmount = 0;
            $productsForOrder = []; // Untuk menyimpan detail produk yang sebenarnya ke tabel order

            foreach ($validatedData['product_details'] as $item) {
                $product = Product::lockForUpdate()->find($item['product_id']); // Lock baris produk untuk menghindari race condition

                if (!$product) {
                    throw ValidationException::withMessages([
                        'product_details' => ["Produk dengan ID {$item['product_id']} tidak ditemukan."]
                    ]);
                }

                if ($product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'product_details' => ["Stok produk '{$product->name}' tidak mencukupi. Stok tersedia: {$product->stock}."]
                    ]);
                }

                // Kurangi stok produk
                $product->stock -= $item['quantity'];
                $product->save();

                // Hitung total harga dan siapkan detail produk untuk disimpan di order
                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $productsForOrder[] = [
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $subtotal,
                ];
            }

            // Buat pesanan utama
            $order = Order::create([
                'customer_name' => $validatedData['customer_name'],
                'customer_contact' => $validatedData['customer_contact'],
                'product_details' => $productsForOrder, // Simpan detail produk yang sudah diproses
                'notes' => $validatedData['notes'],
                'delivery_address' => $validatedData['delivery_address'],
                'delivery_latitude' => $validatedData['delivery_latitude'],
                'delivery_longitude' => $validatedData['delivery_longitude'],
                // Tambahkan 'total_amount' ke tabel orders jika Anda ingin menyimpan total harga
                // 'total_amount' => $totalAmount,
            ]);

            DB::commit(); // Commit transaksi jika semua berhasil

            Log::info('New order created successfully', ['order_id' => $order->id, 'customer' => $order->customer_name]);

            return redirect()->route('order.success', ['orderId' => $order->id])
                             ->with('message', 'Pesanan Anda berhasil dikirim dan stok produk telah diperbarui!');

        } catch (ValidationException $e) {
            DB::rollBack(); // Rollback transaksi jika validasi gagal (misal stok tidak cukup)
            return Redirect::back()->withErrors($e->errors())->withInput(); // Kembali dengan error validasi
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaksi jika terjadi kesalahan lain
            Log::error('Order creation failed', ['error' => $e->getMessage(), 'request' => $request->all()]);
            return Redirect::back()->with('error', 'Terjadi kesalahan saat memproses pesanan: ' . $e->getMessage())->withInput();
        }
    }

    // Halaman sukses pesanan
    public function success(Request $request)
    {
        $orderId = $request->query('orderId');
        $order = Order::find($orderId);

        if (!$order) {
            return redirect()->route('home')->with('error', 'Pesanan tidak ditemukan.');
        }

        // Contoh: Ambil detail pembayaran UMKM (misal, UMKM dengan ID 1)
        // Anda perlu mengaitkan UMKM dengan order, atau ada cara lain untuk menentukan UMKM
        // Untuk hackathon, bisa hardcode dulu ID UMKM, atau ambil dari order jika ada FK ke UMKM
        $umkmPaymentDetails = UmkmPaymentDetail::where('umkm_id', 1)->first(); // Ganti 1 dengan ID UMKM yang relevan

        return Inertia::render('OrderSuccess', [
            'order' => $order,
            'umkmPaymentDetails' => $umkmPaymentDetails,
            'message' => $request->session()->get('message'), // Meneruskan flash message
        ]);
    }

    // Fungsi placeOrder di sini bisa digabungkan ke fungsi store() di atas,
    // karena keduanya melakukan logika pengurangan stok dan pembuatan order.
    // Untuk menyederhanakan, saya sudah menggabungkan logika pengurangan stok ke store().
    // Anda bisa menghapus fungsi placeOrder ini jika sudah digabungkan.
//     public function placeOrder(Request $request)
//     {
//          // Logika di sini sudah dipindahkan ke method store()
//          // Hapus method ini jika tidak digunakan lagi
//     }
// }
//     public function placeOrder(Request $request)
//     {
//         $request->validate([
//             'products' => 'required|array',
//             'products.*.id' => 'required|exists:products,id',
//             'products.*.quantity' => 'required|integer|min:1',
//         ]);

//         DB::beginTransaction(); // Mulai transaksi database

//         try {
//             foreach ($request->products as $item) {
//                 $product = Product::find($item['id']);

//                 if (!$product) {
//                     throw new \Exception("Produk dengan ID {$item['id']} tidak ditemukan.");
//                 }

//                 if ($product->stock < $item['quantity']) {
//                     throw new \Exception("Stok {$product->name} tidak mencukupi.");
//                 }

//                 // Kurangi stok produk
//                 $product->stock -= $item['quantity'];
//                 $product->save();

//                 // Lakukan logika lain untuk menyimpan detail pesanan
//                 // Contoh: Buat entri di tabel 'orders' dan 'order_items'
//             }

//             DB::commit(); // Commit transaksi jika semua berhasil

//             return Inertia::render('OrderSuccess', [
//                 'message' => 'Pesanan berhasil ditempatkan!',
//             ]);
//         } catch (\Exception $e) {
//             DB::rollBack(); // Rollback transaksi jika terjadi kesalahan
//             return Inertia::render('OrderFailed', [
//                 'error' => $e->getMessage(),
//             ]);
//         }
//     }
}