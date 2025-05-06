<?php

namespace App\Models;

use App\Models\Client;
use App\Models\DetailFacture;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Facture extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id',
        'num',
        'date'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function detail_facture()
    {
        return $this->hasMany(DetailFacture::class, 'facture_id');
    }
}