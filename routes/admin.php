<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminImageController;
use App\Http\Controllers\AdminPropertyController;
use Illuminate\Support\Facades\Route;

$domain = env('APP_URL');

Route::domain('')->group(function () {

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/create', [AdminController::class, 'create'])->name('admin.create');
        Route::post('/admin/create', [AdminController::class, 'store']);

        // Admin Properties
        Route::get('/admin/properties/{id}', [AdminPropertyController::class, 'index'])->name('admin.properties.show');
        Route::delete('/admin/properties/{id}', [AdminController::class, 'deleteProperties'])->name('admin.properties.delete');
        Route::patch('/admin/properties/{id}', [AdminPropertyController::class, 'update'])->name('admin.properties.update');

        // Admin Images
        Route::delete('/admin/images/{id}', [AdminImageController::class, 'destroy'])->name('admin.images');

        // Admin Categories
        Route::get('/admin/categories', [AdminController::class, 'viewCategoryPage'])->name('admin.category');
        Route::post('/admin/categories', [AdminController::class, 'createCategory'])->name('admin.category.create');
        Route::delete('/admin/{id}', [AdminController::class, 'destroy'])->name('admin.delete');
    });

});

