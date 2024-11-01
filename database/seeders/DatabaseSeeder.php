<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Somadina',
//            'email' => 'kingswatter@gmail.com',
//            'password' => '12345678',
//            'is_admin' => true
//        ]);

        User::factory()->create([
            'name' => 'Isaac',
            'email' => 'isaacamuchie@gmail.com',
            'password' => 'isaacamuchie1647',
            'is_admin' => true
        ]);

//        $this->call(PropertyCategorySeeder::class);
    }
}
