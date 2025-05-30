<?php

namespace App\Filament\Resources\TransactionResource\Pages;

use App\Filament\Resources\TransactionResource;
use App\Models\Transaction; // Import model Transaction
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;         // Import Infolist
use Filament\Infolists\Components;      // Import Infolist Components
use Illuminate\Support\Str;             // Untuk helper Str::title

class ViewTransaction extends ViewRecord
{
    protected static string $resource = TransactionResource::class;

    // Menambahkan tombol Aksi di header halaman (misalnya tombol Edit)
    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(), // Tombol untuk mengarahkan ke halaman edit
        ];
    }

    // Mendefinisikan Infolist untuk menampilkan detail data
    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make('Informasi Transaksi Utama')
                    ->schema([
                        Components\TextEntry::make('code')
                            ->label('Kode Transaksi'),
                        Components\TextEntry::make('customer.name') // Mengambil nama dari relasi customer
                            ->label('Nama Pelanggan (Akun)'),
                        Components\TextEntry::make('name') // Nama yang tercatat di transaksi
                            ->label('Nama Kontak di Transaksi'),
                        Components\TextEntry::make('phone') // Telepon yang tercatat di transaksi
                            ->label('Telepon Kontak di Transaksi')
                            ->placeholder('Tidak ada nomor telepon'),
                        Components\TextEntry::make('total_price')
                            ->label('Total Harga Keseluruhan')
                            ->money('IDR') // Format sebagai mata uang IDR
                            ->badge(),
                        Components\TextEntry::make('status')
                            ->label('Status')
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => Str::title($state))
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'paid' => 'success',
                                'processing' => 'info',
                                'completed' => 'primary',
                                'failed', 'cancelled' => 'danger',
                                default => 'gray',
                            }),
                        Components\TextEntry::make('created_at')
                            ->label('Tanggal Transaksi Dibuat')
                            ->dateTime('d M Y, H:i:s'),
                        Components\TextEntry::make('updated_at')
                            ->label('Terakhir Diperbarui')
                            ->dateTime('d M Y, H:i:s'),
                    ])->columns(2), // Menampilkan dalam 2 kolom

                // Menampilkan ringkasan produk dalam transaksi
                // Cara yang lebih detail dan interaktif adalah menggunakan Relation Manager (ProductsRelationManager)
                // yang akan muncul di bawah infolist ini.
                // Namun, jika Anda ingin ringkasan sederhana di sini:
                Components\Section::make('Produk dalam Transaksi')
                    ->schema([
                        // Ini adalah cara sederhana untuk menampilkan daftar produk.
                        // Untuk fungsionalitas penuh (edit, hapus item), gunakan Relation Manager.
                        Components\TextEntry::make('products_summary')
                            ->label('') // Label bisa dikosongkan jika judul section sudah cukup
                            ->state(function (Transaction $record) {
                                if ($record->products->isEmpty()) {
                                    return 'Tidak ada produk dalam transaksi ini.';
                                }
                                $summary = [];
                                foreach ($record->products as $product) {
                                    $subtotal = $product->pivot->quantity * $product->pivot->unit_price;
                                    $summary[] = "- {$product->name} (Qty: {$product->pivot->quantity} x Rp " . number_format($product->pivot->unit_price, 0, ',', '.') . ") = Rp " . number_format($subtotal, 0, ',', '.');
                                }
                                return implode("\n", $summary);
                            })
                            ->markdown() // Menggunakan markdown agar newline (\n) di-render sebagai baris baru
                            ->columnSpanFull(),
                    ])
                    ->collapsible() // Bagian ini bisa diciutkan/diluaskan
                    ->hidden(fn (Transaction $record) => $record->products->isEmpty()), // Sembunyikan jika tidak ada produk
            ]);
    }
}