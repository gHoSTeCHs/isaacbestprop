<?php

use App\Http\Controllers\ProfileController;
use App\Models\Property;
use App\Models\PropertyCategory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $categories = PropertyCategory::all();
    $featuredProperties = Property::query()
        ->orderBy('created_at', 'desc')
        ->limit(3)
        ->with(['images'])
        ->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => $categories,
        'featuredProperties' => $featuredProperties
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about', function () {
    $categories = PropertyCategory::all();
    return Inertia::render('About', [
        'categories' => $categories,
    ]);
});
Route::get('/services', function () {
    return Inertia::render('Services');
});
Route::get('/contact', function () {
    return Inertia::render('Services');
});

Route::get('/Properties', function () {
    return Inertia::render('Properties');
});


require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/properties.php';
