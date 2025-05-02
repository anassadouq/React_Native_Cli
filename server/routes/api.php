<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FactureController;

// Client
Route::resource('client', ClientController::class);

// Facture
Route::resource('facture', FactureController::class);
Route::get('facture/show/{client_id}', [FactureController::class, 'show']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});