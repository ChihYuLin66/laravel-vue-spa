<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', [\App\Http\Controllers\AdminHomeController::class, 'index'])->name('home');

