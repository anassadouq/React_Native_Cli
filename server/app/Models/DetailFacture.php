<?php

namespace App\Models;

use App\Models\Facture;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetailFacture extends Model
{
    use HasFactory;
    protected $fillable = [
        'facture_id',
        'designation',
        'qte',
        'pu'
    ];

    public function facture()
    {
        return $this->belongsTo(Facture::class, 'facture_id');
    }
}