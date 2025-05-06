<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('detail_factures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facture_id')->nullable()->constrained('factures')->onDelete('cascade');
            $table->string('designation');
            $table->string('qte');
            $table->string('pu');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_factures');
    }
};