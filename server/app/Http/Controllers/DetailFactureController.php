<?php

namespace App\Http\Controllers;

use App\Models\DetailFacture;
use App\Models\Facture;
use Illuminate\Http\Request;

class DetailFactureController extends Controller
{
    public function index()
    {
        $detail_facture = DetailFacture::all();
        return response()->json($detail_facture);
    }

    public function store(Request $request)
    {
        $detail_facture = DetailFacture::create($request->all());
        return response()->json($detail_facture, 201);
    }

    public function show($facture_id)
    {
        $facture = Facture::find($facture_id);
        return DetailFacture::where('facture_id', $facture_id)->get();
            
        return response()->json(['facture' => $facture, 'facture' => $facture]);
    }

    public function update(Request $request, $id)
    {
        $detail_facture = DetailFacture::find($id);

        if (!$detail_facture) {
            return response()->json(['error' => 'detail_facture not found'], 404);
        }

        $detail_facture->update($request->all());
        return response()->json($detail_facture);
    }

    public function destroy($id)
    {
        $detail_facture = DetailFacture::findOrFail($id);
        $facture_id = $detail_facture->facture_id; // Get the facture ID before deleting the detail_facture
        if (!$detail_facture) {
            return response()->json(['error' => 'detail_facture not found'], 404);
        }

        $detail_facture->delete();
        return response()->json(['message' => 'Item deleted successfully']);
    }
}