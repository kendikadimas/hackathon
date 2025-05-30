<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
// use App\Filament\Resources\TestimonialResource\RelationManagers;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage; // Untuk ImageColumn

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right'; // Ikon testimoni

    protected static ?string $navigationGroup = 'Manajemen Konten'; // Grup navigasi

    protected static ?string $recordTitleAttribute = 'author'; // Untuk global search, menampilkan nama author

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Detail Testimoni')
                    ->schema([
                        Forms\Components\TextInput::make('author')
                            ->label('Nama Pemberi Testimoni')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('content') // Bisa juga RichEditor jika butuh formatting
                            ->label('Isi Testimoni')
                            ->required()
                            ->rows(5)
                            ->maxLength(65535), // Sesuai tipe TEXT di MySQL
                        Forms\Components\FileUpload::make('photo_path')
                            ->label('Foto Pemberi Testimoni (Opsional)')
                            ->disk('public') // Simpan ke disk 'public'
                            ->directory('testimonial-photos') // Simpan dalam subdirektori
                            ->image() // Validasi bahwa file adalah gambar
                            ->imageEditor() // Aktifkan editor gambar (opsional)
                            ->imagePreviewHeight('100')
                            ->nullable() // Foto boleh kosong
                            ->helperText('Unggah foto pemberi testimoni jika ada.'),
                    ])->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('photo_path') // Menggunakan ImageColumn
                    ->label('Foto')
                    ->disk('public') // Ambil dari disk 'public'
                    ->height(60)
                    ->circular() // Tampilkan sebagai lingkaran (opsional)
                    ->defaultImageUrl(fn ($record) => 'https://ui-avatars.com/api/?name=' . urlencode($record->author) . '&color=7F9CF5&background=EBF4FF'), // Default jika foto kosong
                Tables\Columns\TextColumn::make('author')
                    ->label('Nama Author')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('content')
                    ->label('Isi Testimoni')
                    ->limit(50) // Batasi panjang teks yang ditampilkan
                    ->tooltip(fn (Testimonial $record): string => $record->content) // Tampilkan penuh saat hover
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Tambahkan filter jika diperlukan
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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            // 'view' => Pages\ViewTestimonial::route('/{record}'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}