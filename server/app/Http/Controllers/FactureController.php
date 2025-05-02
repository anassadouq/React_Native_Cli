<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    public function index()
    {
        $wortschatzs = Facture::all();
        return response()->json($wortschatzs);
    }

    public function store(Request $request)
    {
        $facture = Facture::create($request->all());
        return response()->json($facture, 201);
    }

    public function show($client_id)
    {
        $client = Client::find($client_id);
        $facture = Facture::where('client_id', $client_id)->get();
    
        return response()->json(['client' => $client, 'facture' => $facture]);
    }

    public function update(Request $request, $id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json(['error' => 'facture not found'], 404);
        }

        $facture->update($request->all());
        return response()->json($facture);
    }

    public function destroy($id)
    {
        $facture = Facture::findOrFail($id);
        $client_id = $facture->client_id; // Get the client ID before deleting the facture
        if (!$facture) {
            return response()->json(['error' => 'facture not found'], 404);
        }

        $facture->delete();
        return response()->json(['message' => 'Item deleted successfully']);
    }
}