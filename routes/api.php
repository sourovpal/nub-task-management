<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\ProjectController;
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
            Route::get('/{department}', 'find');
            Route::get('/{department}/show', 'show');
            Route::post('/screenshot/{project}', 'screenshot');
            Route::post('/', 'create');
            Route::put('/{department}', 'update');
            Route::delete('/{department}', 'delete');
        });

    Route::prefix('/kanban')
        ->controller(KanbanController::class)
        ->group(function () {
            Route::get('/statuses', 'statuses');
            Route::get('/tasks', 'tasks');
            Route::post('/status', 'createStatus');
            Route::post('/task', 'createTask');
            Route::put('/task/position', 'position');
        });
});
