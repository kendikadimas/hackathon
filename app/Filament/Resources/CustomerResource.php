<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
// use App\Filament\Resources\CustomerResource\RelationManagers; // Jika ada relasi
use App\Models\Customer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CustomerResource extends Resource
{
    protected static ?string $model = Customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-users'; // Ikon untuk navigasi

    protected static ?string $navigationGroup = 'Manajemen Pengguna'; // Grup navigasi (opsional)

    protected static ?string $recordTitleAttribute = 'name'; // Untuk global search

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Pelanggan')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Pelanggan')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->label('Nomor Telepon')
                            ->tel() // Memberikan input mode telepon
                            ->unique(Customer::class, 'phone', ignoreRecord: true) // Unik, abaikan record saat ini jika sedang edit
                            ->nullable() // Sesuai migrasi, boleh kosong
                            ->maxLength(20), // Sesuaikan batas maksimal
                        Forms\Components\TextInput::make('email')
                            ->label('Alamat Email')
                            ->email() // Validasi format email
                            ->unique(Customer::class, 'email', ignoreRecord: true) // Unik
                            ->nullable() // Sesuai migrasi, boleh kosong
                            ->maxLength(255),
                    ])->columns(1), // Menggunakan 1 kolom untuk section ini, atau 2 jika lebih suka berdampingan
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Pelanggan')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Nomor Telepon')
                    ->searchable()
                    ->copyable() // Tambahkan aksi salin
                    ->placeholder('N/A'), // Teks jika kosong
                Tables\Columns\TextColumn::make('email')
                    ->label('Alamat Email')
                    ->searchable()
                    ->copyable()
                    ->placeholder('N/A'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true), // Sembunyikan default, user bisa menampilkan
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Tanggal Diperbarui')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Tambahkan filter jika diperlukan, misalnya:
                // Tables\Filters\Filter::make('verified')
                //     ->query(fn (Builder $query): Builder => $query->whereNotNull('email_verified_at')),
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
            // Jika Anda membuat RelationManager untuk transaksi misalnya:
            // RelationManagers\TransactionsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            // 'view' => Pages\ViewCustomer::route('/{record}'), // Untuk halaman lihat detail
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}