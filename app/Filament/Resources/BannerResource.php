<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
// use App\Filament\Resources\BannerResource\RelationManagers; // Jika tidak ada, bisa di-comment atau hapus
use App\Models\Banner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage; // Untuk ImageColumn dan FileUpload

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Manajemen Konten';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Upload Banner') // Judul section bisa disesuaikan
                    ->schema([
                        Forms\Components\FileUpload::make('photo')
                            ->label('Foto Banner')
                            ->required() // Foto wajib diisi
                            ->image() // Validasi bahwa file adalah gambar
                            ->disk('public') // Simpan ke disk 'public' (merujuk ke storage/app/public)
                            ->directory('banners') // Simpan dalam subdirektori 'banners' (storage/app/public/banners)
                            ->visibility('public') // Set visibilitas file agar bisa diakses publik
                            ->imageEditor() // Opsional: aktifkan editor gambar sederhana
                            ->imagePreviewHeight('200') // Tinggi preview gambar di form
                            ->loadingIndicatorPosition('left')
                            // Opsi tambahan untuk kustomisasi tampilan FileUpload:
                            // ->panelAspectRatio('16:9') 
                            // ->panelLayout('integrated')
                            // ->removeUploadedFileButtonPosition('right')
                            // ->uploadButtonPosition('left')
                            // ->uploadProgressIndicatorPosition('left')
                            ->helperText('Unggah gambar untuk banner. Pastikan file adalah gambar (jpg, png, gif, dll).'),
                    ])
                    ->columns(1), // Menggunakan 1 kolom untuk section ini
            ]);
    }

    public static function table(Table $table): Table
    {
        // Pastikan method table() tetap ada dan sesuai dengan kebutuhan tampilan daftar banner
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Foto Banner')
                    ->disk('public')
                    ->height(80),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Filter jika ada
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->after(function (Banner $record) {
                        if ($record->photo && Storage::disk('public')->exists($record->photo)) {
                            Storage::disk('public')->delete($record->photo);
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->after(function (\Illuminate\Database\Eloquent\Collection $records) {
                            foreach ($records as $record) {
                                if ($record->photo && Storage::disk('public')->exists($record->photo)) {
                                    Storage::disk('public')->delete($record->photo);
                                }
                            }
                        }),
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
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
            // 'view' => Pages\ViewBanner::route('/{record}'),
        ];
    }
}