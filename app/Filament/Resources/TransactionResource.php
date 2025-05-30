<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransactionResource\Pages;
use App\Filament\Resources\TransactionResource\RelationManagers; 
// use App\Filament\Resources\TransactionResource\RelationManagers;
use App\Models\Customer; // Pastikan Customer model di-import
use App\Models\Transaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str; // Untuk generate kode unik jika perlu

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-receipt-refund'; // Ikon transaksi

    protected static ?string $navigationGroup = 'Manajemen Transaksi'; // Grup navigasi

    protected static ?string $recordTitleAttribute = 'code'; // Untuk global search

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Transaksi')
                    ->schema([
                        Forms\Components\Select::make('cust_id')
                            ->label('Pelanggan')
                            ->relationship('customer', 'name') // Ambil 'name' dari relasi 'customer'
                            ->searchable()
                            ->preload()
                            ->live() // Untuk interaktivitas jika diperlukan
                            ->afterStateUpdated(function (Forms\Set $set, ?string $state) {
                                // Isi otomatis nama dan telepon jika pelanggan dipilih
                                if ($state) {
                                    $customer = Customer::find($state);
                                    if ($customer) {
                                        $set('name', $customer->name);
                                        $set('phone', $customer->phone);
                                    }
                                } else {
                                    $set('name', null);
                                    $set('phone', null);
                                }
                            })
                            ->createOptionForm([ // Opsi untuk membuat pelanggan baru dari form ini
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('phone')
                                    ->tel()
                                    ->nullable()
                                    ->maxLength(20),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->nullable()
                                    ->maxLength(255),
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('code')
                            ->label('Kode Transaksi')
                            ->required()
                            ->unique(Transaction::class, 'code', ignoreRecord: true)
                            ->default(fn () => 'INV-' . strtoupper(Str::random(8))) // Contoh kode default
                            ->maxLength(255),
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Kontak di Transaksi')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Nama ini akan disimpan di transaksi, bisa berbeda dari nama pelanggan jika perlu.'),
                        Forms\Components\TextInput::make('phone')
                            ->label('Telepon Kontak di Transaksi')
                            ->tel()
                            ->nullable()
                            ->maxLength(20),
                        // Jika Anda menambahkan payment_model:
                        /*
                        Forms\Components\Select::make('payment_model')
                            ->label('Metode Pembayaran')
                            ->options([
                                'cash' => 'Tunai',
                                'transfer' => 'Transfer Bank',
                                'ewallet' => 'E-Wallet',
                            ])
                            ->required(),
                        */
                        Forms\Components\TextInput::make('total_price')
                            ->label('Total Harga')
                            ->required()
                            ->numeric()
                            ->prefix('Rp')
                            ->inputMode('decimal'),
                        Forms\Components\Select::make('status')
                            ->label('Status Transaksi')
                            ->options([
                                'pending' => 'Pending',
                                'paid' => 'Sudah Dibayar',
                                'processing' => 'Diproses',
                                'completed' => 'Selesai',
                                'failed' => 'Gagal',
                                'cancelled' => 'Dibatalkan',
                            ])
                            ->default('pending')
                            ->required(),
                    ])->columns(2), // Mengatur layout 2 kolom
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('code')
                    ->label('Kode Transaksi')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('customer.name') // Menampilkan nama dari relasi customer
                    ->label('Pelanggan')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Kontak Transaksi')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total Harga')
                    ->money('IDR') // Format sebagai mata uang IDR
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'paid' => 'success',
                        'processing' => 'info',
                        'completed' => 'primary',
                        'failed', 'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => Str::title($state)) // Kapitalisasi status
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Transaksi')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Sudah Dibayar',
                        'processing' => 'Diproses',
                        'completed' => 'Selesai',
                        'failed' => 'Gagal',
                        'cancelled' => 'Dibatalkan',
                    ]),
                // Filter berdasarkan pelanggan
                Tables\Filters\SelectFilter::make('cust_id')
                    ->label('Pelanggan')
                    ->relationship('customer', 'name')
                    ->searchable()
                    ->preload(),
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
            RelationManagers\ProductsRelationManager::class,
            // Jika Anda ingin menampilkan detail item transaksi, daftarkan RelationManager di sini
            // Contoh: RelationManagers\TransactionItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTransactions::route('/'),
            'create' => Pages\CreateTransaction::route('/create'),
            'view' => Pages\ViewTransaction::route('/{record}'),
            'edit' => Pages\EditTransaction::route('/{record}/edit'),
        ];
    }
}