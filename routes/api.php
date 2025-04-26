<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\User\MessageController;

Route::post('/login', [UserController::class, 'login']);
Route::post('/start', [UserController::class, 'start']);
Route::get('/user/name/{username}', [UserController::class, 'getName']);
Route::post('/users', [UserController::class, 'store']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
});
