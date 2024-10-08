<?php

use App\Http\Controllers\PropertyCategoryController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;

Route::get('/properties/categories', [PropertyCategoryController::class, 'index']);
Route::get('/properties/categories/{title}', [PropertyCategoryController::class, 'getPropertiesByCategory']);
