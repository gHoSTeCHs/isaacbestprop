<?php

use App\Http\Controllers\AdminConstructionController;
use App\Http\Controllers\ConstructionController;
use Illuminate\Support\Facades\Route;

Route::get('/construction', [ConstructionController::class, 'index']);
Route::get('/construction/projects/{id}', [ConstructionController::class, 'show']);

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/construction', [AdminConstructionController::class, 'index'])->name('construction.index');
    Route::post('/admin/construction', [AdminConstructionController::class, 'store'])->name('construction.store');
});
