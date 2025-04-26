<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\User\MessageController;
use App\Http\Controllers\API\User\Auth\PasswordController;
use App\Http\Controllers\API\User\Auth\AuthenticatedSessionController;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/start', [UserController::class, 'start']);
Route::get('/user/name/{username}', [UserController::class, 'getName']);
Route::post('/users', [UserController::class, 'store']);

Route::middleware('auth:api')->group(function () {
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');
});
