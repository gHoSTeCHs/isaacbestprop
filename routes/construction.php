<?php

use App\Http\Controllers\ConstructionController;

\Illuminate\Support\Facades\Route::get('/construction', [ConstructionController::class, 'index']);
