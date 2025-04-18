<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
