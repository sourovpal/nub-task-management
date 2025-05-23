<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashoboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectTaskController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TaskCommantController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});


Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::prefix('/dashboard')
        ->controller(DashoboardController::class)
        ->group(function () {
            Route::get('/', 'index');
        });

    Route::prefix('/users')
        ->controller(UserController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/list', 'list');
            Route::get('/{user}', 'find');
            Route::get('/{user}/show', 'show');
            Route::post('/', 'create');
            Route::put('/{user}', 'update');
            Route::delete('/{user}', 'delete');
        });

    Route::prefix('/departments')
        ->controller(DepartmentController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/list', 'list');
            Route::get('/{department}', 'find');
            Route::get('/{department}/show', 'show');
            Route::post('/', 'create');
            Route::put('/{department}', 'update');
            Route::delete('/{department}', 'delete');
        });

    Route::prefix('/projects')
        ->controller(ProjectController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{id}', 'find');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'delete');
        });

    Route::prefix('/status')
        ->controller(StatusController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'delete');
        });

    Route::prefix('/tasks')
        ->controller(ProjectTaskController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::post('/position', 'updatePosition');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'delete');
            Route::get('/events', 'events');
            Route::get('/commants', [TaskCommantController::class, 'index']);
            Route::post('/commants', [TaskCommantController::class, 'create']);
            Route::post('assign', 'assignUsers');
        });

    Route::prefix('/quotations')
        ->controller(QuotationController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'delete');
        });
});
