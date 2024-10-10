<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/create', [AdminController::class, 'create'])->name('admin.create');
    Route::post('/admin/create', [AdminController::class, 'store']);
    Route::get('/admin/categories', [AdminController::class, 'viewCategoryPage'])->name('admin.category');
    Route::post('/admin/categories', [AdminController::class, 'createCategory'])->name('admin.category');
    Route::delete('/admin/{id}', [AdminController::class, 'destroy'])->name('admin.delete');
// Add more admin routes here
});
