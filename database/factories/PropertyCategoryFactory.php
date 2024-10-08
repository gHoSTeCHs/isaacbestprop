<?php

namespace Database\Factories;

use App\Models\CategoryImage;
use App\Models\Property;
use App\Models\PropertyCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PropertyCategory>
 */
class PropertyCategoryFactory extends Factory
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
            'title' => fake()->word(),
            'description' => fake()->paragraph(nbSentences: 2)
        ];
    }

    public function configure()
    {
        return $this->has(Property::factory()->count(5), 'properties')->has(CategoryImage::factory()->count(1), 'image');
    }
}
