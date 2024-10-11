<?php

namespace App\Http\Controllers;

use App\Models\Amenities;
use App\Models\Property;
use App\Models\PropertyCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $property = Property::query()
            ->with(['images', 'amenities'])
            ->findOrFail($id);
        $categories = PropertyCategory::query()->get();
        return Inertia::render('Admin/Update', [
            'property' => $property,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @throws ValidationException
     */
    public function update(Request $request, $id): void
    {
        $property = Property::query()->where('id', $id);
        $attributes = $request->validate([
            "title" => 'required',
            "category" => "required",
            "description" => "required",
            "amenities" => 'required',
            "location" => "required",
            "bathrooms" => 'required',
            "bedrooms" => 'required',
            "price" => 'required',
            "video_url" => "required",
            "images" => 'required',
            'sold' => 'required'
        ]);

        $category = PropertyCategory::query()->where('title', $attributes['category'])->first();
        if (!$category) {
            throw ValidationException::withMessages(['category', 'Category not found']);
        }

        $property->update([
            'property_category_id' => $category->id,
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'location' => $attributes['location'],
            'bathrooms' => $attributes['bathrooms'],
            'bedrooms' => $attributes['bedrooms'],
            'price' => $attributes['price'],
            'video_url' => $attributes['video_url'],
            'sold' => $attributes['sold']
        ]);

        $amenities = Amenities::query()
            ->where('property_id', $id)
            ->get();

        foreach ($amenities as $amenity) {
            $amenity->delete();
        }

        $newAmenities = $request['amenities'];
        foreach ($newAmenities as $newAmenity) {
            $value = $newAmenity['amenity'];
            Amenities::query()->create([
                'property_id' => $id,
                'amenity' => $value
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
