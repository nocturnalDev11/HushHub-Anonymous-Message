<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\User\MessageController;

Route::post('/login', [UserController::class, 'login']);
Route::post('/start', [UserController::class, 'start']);
Route::get('/user/name/{username}', [UserController::class, 'getName']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
});
