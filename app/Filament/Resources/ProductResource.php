<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
// use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage; // Tambahkan ini
use Illuminate\Support\Str; // Untuk slug atau helper string lainnya jika perlu

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag'; // Ikon untuk produk

    protected static ?string $navigationGroup = 'Manajemen Produk'; // Grup navigasi

    protected static ?string $recordTitleAttribute = 'name'; // Untuk global search

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Produk')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Produk')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true), // Untuk update state saat field kehilangan fokus
                            /* // Jika Anda ingin membuat slug otomatis (perlu kolom slug di database)
                            ->afterStateUpdated(function (Forms\Set $set, ?string $state) {
                                if ($state) {
                                    $set('slug', Str::slug($state));
                                }
                            }),
                        */
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(5)
                            ->nullable(),
                        Forms\Components\TextInput::make('price')
                            ->label('Harga')
                            ->required()
                            ->numeric()
                            ->prefix('Rp') // Prefix untuk mata uang Rupiah
                            ->inputMode('decimal'),
                        Forms\Components\TextInput::make('stock')
                            ->label('Stok')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->inputMode('numeric'),
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Gambar Produk')
                            ->disk('public') // Simpan ke disk 'public'
                            ->directory('product-images') // Simpan dalam subdirektori 'product-images'
                            ->image() // Validasi bahwa file adalah gambar
                            ->imageEditor() // Aktifkan editor gambar (opsional)
                            ->imagePreviewHeight('150')
                            ->nullable()
                            ->helperText('Unggah gambar produk. Kosongkan jika tidak ingin mengubah gambar.'),
                    ])->columns(2), // Mengatur layout menjadi 2 kolom
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('image_path') // Menggunakan ImageColumn untuk menampilkan gambar
                    ->label('Gambar')
                    ->disk('public') // Ambil dari disk 'public'
                    ->height(60),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Produk')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR') // Format sebagai mata uang Rupiah
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->label('Stok')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Tambahkan filter jika diperlukan
                // Tables\Filters\Filter::make('is_featured'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Jika ada relasi, daftarkan RelationManager di sini
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}