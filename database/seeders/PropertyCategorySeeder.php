<?php

namespace Database\Seeders;

use App\Models\PropertyCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        PropertyCategory::factory()->count(10)->create();
    }
}
