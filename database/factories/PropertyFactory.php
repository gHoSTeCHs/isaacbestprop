<?php

namespace Database\Factories;

use App\Models\Amenities;
use App\Models\PropertyCategory;
use App\Models\PropertyImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_category_id' => PropertyCategory::factory(),
            'title' => fake()->title(),
            'description' => fake()->paragraph(),
            'location' => fake()->address(),
            'bathrooms' => fake()->randomElement([2, 4, 0, 3, 5, 2, 3]),
            'bedrooms' => fake()->randomElement([2, 4, 0, 3, 5, 2, 3]),
            'price' => fake()->randomElement([23342, 445656, 13343453, 6545656, 2342346, 1466768, 22343467, 2342266456, 13134543, 55645656, 2342547, 23452646]),
            'video_url' => 'https://youtu.be/mOZ3L0jxoZc?si=pKn8IenvDQNVaCEv',
            'sold' => fake()->randomElement([0, 1])
        ];
    }

    public function configure(): PropertyFactory|Factory
    {
        return $this->has(PropertyImage::factory()->count(3), 'images')->has(Amenities::factory()->count(5), 'amenities');
    }
}
