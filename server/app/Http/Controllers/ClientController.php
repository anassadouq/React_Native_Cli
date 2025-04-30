<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tel' => 'required',
        ]);

        $client = new Client([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'tel' => $validated['tel'],
        ]);

        $client->save();

        return response()->json([
            'message' => 'client created successfully',
            'client' => $client,
        ], 201);
    }

    public function show(Client $client)
    {
        return response()->json([
            'client' => $client,
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tel' => 'required',
        ]);
        $client->update($validated);

        return response()->json([
            'message' => 'client updated successfully',
            'client' => $client,
        ]);
    }

    public function destroy(Client $client)
    {
        // Delete client record
        $client->delete();

        return response()->json([
            'message' => 'client deleted successfully',
        ]);
    }
}