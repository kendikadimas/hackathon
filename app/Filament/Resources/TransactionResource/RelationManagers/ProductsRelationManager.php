<?php

namespace App\Filament\Resources\TransactionResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\Product; // Import Product model

class ProductsRelationManager extends RelationManager
{
    protected static string $relationship = 'products';

    // Kolom yang ingin ditampilkan dari tabel Product sebagai judul pilihan
    protected static ?string $recordTitleAttribute = 'name';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                // Field untuk memilih produk (Filament akan otomatis membuat ini berdasarkan $recordTitleAttribute)
                // Forms\Components\Select::make('product_id')
                //     ->relationship('product', 'name') // Jika relasi di pivot didefinisikan berbeda
                //     ->searchable()
                //     ->preload()
                //     ->createOptionForm(Product::getForm()) // Jika ProductResource punya getForm() statis
                //     ->required(),
                Forms\Components\TextInput::make('quantity')
                    ->label('Jumlah')
                    ->numeric()
                    ->default(1)
                    ->required(),
                Forms\Components\TextInput::make('unit_price')
                    ->label('Harga Satuan (Rp)')
                    ->numeric()
                    ->required()
                    ->prefix('Rp')
                    ->inputMode('decimal')
                    ->helperText('Harga produk pada saat transaksi ini.'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            // ->recordTitleAttribute('name') // Jika kolom 'name' ada langsung di pivot (tidak umum)
            ->columns([
                Tables\Columns\TextColumn::make('name') // Mengambil dari model Product terkait
                    ->label('Nama Produk'),
                Tables\Columns\TextColumn::make('pivot.quantity') // Mengakses data dari pivot table
                    ->label('Jumlah'),
                Tables\Columns\TextColumn::make('pivot.unit_price')
                    ->label('Harga Satuan')
                    ->money('IDR'),
                Tables\Columns\TextColumn::make('sub_total')
                    ->label('Subtotal')
                    ->getStateUsing(function ($record) {
                        return $record->pivot->quantity * $record->pivot->unit_price;
                    })
                    ->money('IDR'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\AttachAction::make() // Menggunakan AttachAction untuk many-to-many
                    ->form(fn (Tables\Actions\AttachAction $action): array => [
                        $action->getRecordSelect(), // Otomatis membuat select untuk produk
                        Forms\Components\TextInput::make('quantity')->numeric()->default(1)->required(),
                        Forms\Components\TextInput::make('unit_price')
                            ->numeric()
                            ->required()
                            ->label('Harga Satuan (Rp)')
                            ->prefix('Rp')
                            ->inputMode('decimal')
                            // Ambil harga default dari produk jika dipilih
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Forms\Get $get, Forms\Set $set, ?string $old, ?string $state) {
                                // Fungsi ini mungkin perlu penyesuaian tergantung bagaimana Anda ingin
                                // mengambil harga produk saat produk dipilih di form AttachAction.
                                // Untuk saat ini, kita biarkan diisi manual atau bisa coba diisi dari harga produk
                                // jika record select sudah dipilih.
                                $productId = $get('recordId'); // ID produk yang dipilih di AttachAction
                                if ($productId && !$state) { // Hanya isi jika harga satuan belum diisi
                                     $product = Product::find($productId);
                                     if ($product) {
                                         $set('unit_price', $product->price);
                                     }
                                }
                            }),
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(), // Mengedit data pivot (quantity, unit_price)
                Tables\Actions\DetachAction::make(), // Melepas produk dari transaksi
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DetachBulkAction::make(),
                ]),
            ]);
    }
}