<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FinancialEntryResource\Pages;
// use App\Filament\Resources\FinancialEntryResource\RelationManagers;
use App\Models\FinancialEntry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FinancialEntryResource extends Resource
{
    protected static ?string $model = FinancialEntry::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar'; // Ikon untuk navigasi

    protected static ?string $navigationGroup = 'Keuangan'; // Grup navigasi

    protected static ?string $modelLabel = 'Entri Keuangan'; // Label untuk model

    protected static ?string $pluralModelLabel = 'Entri-entri Keuangan'; // Label plural

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Entri Keuangan')
                    ->schema([
                        Forms\Components\TextInput::make('description')
                            ->label('Deskripsi')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\Select::make('type')
                            ->label('Jenis Entri')
                            ->options([
                                FinancialEntry::TYPE_INCOME => 'Pemasukan (Income)',
                                FinancialEntry::TYPE_EXPENSE => 'Pengeluaran (Expense)',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('amount')
                            ->label('Jumlah')
                            ->required()
                            ->numeric()
                            ->prefix('Rp')
                            ->inputMode('decimal'),
                        Forms\Components\DateTimePicker::make('entry_date')
                            ->label('Tanggal Entri')
                            ->default(now()) // Default ke waktu saat ini
                            ->required(),
                        Forms\Components\TextInput::make('reference')
                            ->label('Referensi (Opsional)')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('notes')
                            ->label('Catatan Tambahan (Opsional)')
                            ->columnSpanFull()
                            ->rows(3),
                    ])->columns(2), // Mengatur layout menjadi 2 kolom
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('entry_date')
                    ->label('Tanggal')
                    ->dateTime('d M Y, H:i') // Format tanggal dan waktu
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Deskripsi')
                    ->searchable()
                    ->limit(40)
                    ->tooltip(fn (FinancialEntry $record): string => $record->description),
                Tables\Columns\TextColumn::make('type')
                    ->label('Jenis')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => $state === FinancialEntry::TYPE_INCOME ? 'Pemasukan' : 'Pengeluaran')
                    ->color(fn (string $state): string => match ($state) {
                        FinancialEntry::TYPE_INCOME => 'success',
                        FinancialEntry::TYPE_EXPENSE => 'danger',
                        default => 'gray',
                    })
                    ->searchable(),
                Tables\Columns\TextColumn::make('amount')
                    ->label('Jumlah')
                    ->money('IDR') // Format sebagai mata uang Rupiah
                    ->sortable()
                    ->summarize(Tables\Columns\Summarizers\Sum::make()->money('IDR')->label('Total')), // Menampilkan total di footer tabel
                Tables\Columns\TextColumn::make('reference')
                    ->label('Referensi')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('entry_date', 'desc') // Default urutan tabel
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Jenis Entri')
                    ->options([
                        FinancialEntry::TYPE_INCOME => 'Pemasukan',
                        FinancialEntry::TYPE_EXPENSE => 'Pengeluaran',
                    ]),
                // Anda bisa menambahkan filter berdasarkan rentang tanggal
                // Tables\Filters\Filter::make('entry_date')
                //     ->form([
                //         Forms\Components\DatePicker::make('entry_date_from')->label('Dari Tanggal'),
                //         Forms\Components\DatePicker::make('entry_date_until')->label('Sampai Tanggal'),
                //     ])
                //     ->query(function (Builder $query, array $data): Builder {
                //         return $query
                //             ->when(
                //                 $data['entry_date_from'],
                //                 fn (Builder $query, $date): Builder => $query->whereDate('entry_date', '>=', $date),
                //             )
                //             ->when(
                //                 $data['entry_date_until'],
                //                 fn (Builder $query, $date): Builder => $query->whereDate('entry_date', '<=', $date),
                //             );
                //     })
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFinancialEntries::route('/'),
            'create' => Pages\CreateFinancialEntry::route('/create'),
            // 'view' => Pages\ViewFinancialEntry::route('/{record}'),
            'edit' => Pages\EditFinancialEntry::route('/{record}/edit'),
        ];
    }

    /**
     * Catatan: Untuk menampilkan statistik profit/rugi secara keseluruhan,
     * Anda biasanya akan membuat halaman khusus atau widget dashboard di Filament.
     * Widget tersebut akan melakukan query ke tabel 'financial_entries' ini,
     * menghitung total pemasukan dan pengeluaran dalam periode tertentu,
     * lalu menampilkan selisihnya sebagai profit atau rugi.
     *
     * Contoh query sederhana untuk profit dalam periode tertentu:
     * $totalIncome = FinancialEntry::where('type', 'income')->whereBetween('entry_date', [$startDate, $endDate])->sum('amount');
     * $totalExpense = FinancialEntry::where('type', 'expense')->whereBetween('entry_date', [$startDate, $endDate])->sum('amount');
     * $profitOrLoss = $totalIncome - $totalExpense;
     */
}