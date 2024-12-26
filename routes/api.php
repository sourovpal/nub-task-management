<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('v1')->group(function () {

    Route::prefix('/users')
        ->controller(UserController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{user}', 'find');
            Route::get('/{user}/show', 'show');
            Route::post('/', 'create');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'delete');
        });
});
