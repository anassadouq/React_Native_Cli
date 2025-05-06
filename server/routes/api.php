<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\DetailFactureController;

// Client
Route::resource('client', ClientController::class);

// Facture
Route::resource('facture', FactureController::class);
Route::get('facture/{client_id}', [FactureController::class, 'show']);

// Detail Facture
Route::resource('detail_facture', DetailFactureController::class);
Route::get('detail_facture/{facture_id}', [DetailFactureController::class, 'show']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});