<?php


use App\Http\Controllers\AdminGalleryController;
use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{gallery}', [GalleryController::class, 'show'])->name('gallery.show');


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/gallery', [AdminGalleryController::class, 'index'])->name('gallery.index');
    Route::post('/admin/gallery/create', [AdminGalleryController::class, 'store'])->name('gallery.create');
});
