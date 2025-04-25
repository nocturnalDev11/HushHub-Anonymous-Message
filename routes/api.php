<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\User\MessageController;

Route::post('/login', [UserController::class, 'login']);
Route::post('/start', [UserController::class, 'start']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/user/name/{username}', [UserController::class, 'getName']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);
