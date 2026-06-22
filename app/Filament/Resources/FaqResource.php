<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
// use App\Filament\Resources\FaqResource\RelationManagers; // Jika ada relasi
use App\Models\Faq;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle'; // Ikon untuk navigasi

    protected static ?string $navigationGroup = 'Manajemen Konten'; // Grup navigasi (opsional)

    protected static ?string $recordTitleAttribute = 'question'; // Untuk global search, menampilkan pertanyaan

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail FAQ')
                    ->schema([
                        Forms\Components\Textarea::make('question')
                            ->label('Pertanyaan')
                            ->required()
                            ->rows(3) // Jumlah baris awal untuk textarea
                            ->maxLength(65535), // Batas maksimal untuk tipe TEXT MySQL
                        Forms\Components\RichEditor::make('answer') // Menggunakan RichEditor untuk jawaban
                            ->label('Jawaban')
                            ->required()
                            ->maxLength(65535)
                            ->toolbarButtons([ // Kustomisasi tombol toolbar RichEditor (opsional)
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'underline',
                                'undo',
                            ])
                            ->columnSpanFull(), // Mengambil lebar penuh dalam grid
                        
                        // Jika Anda menambahkan kolom is_active:
                        /*
                        Forms\Components\Toggle::make('is_active')
                            ->label('Aktifkan FAQ')
                            ->default(true)
                            ->columnSpanFull(),
                        */
                        // Jika Anda menambahkan kolom sort_order:
                        /*
                        Forms\Components\TextInput::make('sort_order')
                            ->label('Urutan Tampilan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Angka lebih kecil akan ditampilkan lebih dulu.')
                            ->columnSpanFull(),
                        */
                    ])->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('question')
                    ->label('Pertanyaan')
                    ->limit(50) // Batasi panjang teks yang ditampilkan di tabel
                    ->tooltip(fn (Faq $record): string => $record->question) // Tampilkan teks penuh saat hover
                    ->searchable()
                    ->sortable(),
                // Jika Anda ingin menampilkan preview jawaban (mungkin perlu strip_tags jika menggunakan RichEditor)
                Tables\Columns\TextColumn::make('answer')
                    ->label('Jawaban (Preview)')
                    ->limit(70)
                    ->formatStateUsing(fn (string $state): string => strip_tags($state)) // Hilangkan tag HTML untuk preview
                    ->tooltip(fn (Faq $record): string => strip_tags($record->answer))
                    ->toggleable(isToggledHiddenByDefault: true), // Sembunyikan default
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Jika Anda menambahkan is_active:
                // Tables\Filters\TernaryFilter::make('is_active')->label('Status Aktif'),
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
            'index' => Pages\ListFaqs::route('/'), // Pastikan nama class Pages benar (ListFaql atau ListFaqs)
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}