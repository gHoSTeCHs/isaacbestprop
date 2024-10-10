<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyCategory;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Pest\Laravel\json;

class AdminController extends Controller
{
    //
    public function index()
    {
        $properties = Property::query()->with(['images'])->orderBy('created_at', 'desc')->paginate(3);
        return Inertia::render('Admin/Dashboard', [
            'properties' => $properties
        ]);
    }

    public function create()
    {
        $categories = PropertyCategory::query()->get();
        return Inertia::render('Admin/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $attributes = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'description' => 'required',
            'location' => 'required',
            'bathrooms' => 'required',
            'bedrooms' => 'required',
            'price' => 'required',
            'video_url' => 'required',
            'sold' => 'required',
            'images' => 'required',
        ]);

        $category = PropertyCategory::query()
            ->where('title', $attributes['category'])
            ->first();

        if (!$category) {
            return back()->withErrors(['category', "Category not found"]);
        }

        $property = Property::query()
            ->create([
                'property_category_id' => $category->id,
                'title' => $attributes['title'],
                'description' => $attributes['description'],
                'location' => $attributes['location'],
                'bathrooms' => $attributes['bathrooms'],
                'bedrooms' => $attributes['bedrooms'],
                'price' => $attributes['price'],
                'video_url' => $attributes['video_url'],
                'sold' => $attributes['sold'],
            ]);

        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('uploads', 'public');
                PropertyImage::query()->create([
                    'property_id' => $property->id,
                    'path' => $path
                ]);
            }
        }

        return redirect()->route('admin.create')->with('success', 'Property created successfully');
    }
}
