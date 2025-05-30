<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\TransactionResource; // Untuk membuat link ke detail transaksi
use App\Models\Transaction;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Str;

class LatestTransactionsTable extends BaseWidget
{
    protected static ?int $sort = 2; // Urutan widget setelah stats overview
    protected int | string | array $columnSpan = 'full'; // Widget mengambil lebar penuh

    protected static ?string $heading = 'Transaksi Terakhir';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Transaction::query()
                    ->with('customer') // Eager load relasi customer
                    ->latest() // Urutkan berdasarkan terbaru (created_at desc)
                    ->limit(5)  // Ambil 5 transaksi terakhir
            )
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->label('Kode Transaksi')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer.name')
                    ->label('Nama Pelanggan')
                    ->searchable()
                    ->sortable()
                    ->placeholder('Pelanggan Tidak Diketahui'),
                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total Harga')
                    ->money('IDR') // Format sebagai mata uang IDR
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
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
                    })
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Transaksi')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\Action::make('Lihat')
                    ->url(fn (Transaction $record): string => TransactionResource::getUrl('view', ['record' => $record]))
                    ->icon('heroicon-o-eye'),
            ])
            ->emptyStateHeading('Belum ada transaksi.')
            ->paginated(false); // Nonaktifkan paginasi untuk widget
    }
}