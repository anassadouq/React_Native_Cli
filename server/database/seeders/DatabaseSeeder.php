<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
         \App\Models\Client::factory(20)->create();
        $products = ['tv', 'phone', 'pc'];
        foreach ($products as $product ) {
            Product::create(['name' => $product]);
        }
    }
}
