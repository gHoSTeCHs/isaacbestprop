<?php

namespace Database\Factories;

use App\Models\CategoryImage;
use App\Models\PropertyCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CategoryImage>
 */
class CategoryImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'property_category_id'=>PropertyCategory::factory(),
            'path'=>fake()->imageUrl()
        ];
    }
}
