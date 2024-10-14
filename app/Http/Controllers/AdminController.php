<?php

namespace App\Http\Controllers;

use App\Models\Amenities;
use App\Models\CategoryImage;
use App\Models\Property;
use App\Models\PropertyCategory;
use App\Models\PropertyImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use function Pest\Laravel\json;

class AdminController extends Controller
{
    //

    /**
     * @var
     */
    public $categories;

    public function __construct()
    {
        $this->categories = PropertyCategory::query()->with('image')->get();
    }

    public function index(): Response
    {
        $properties = Property::query()->with(['images'])->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Dashboard', [
            'properties' => $properties
        ]);
    }

    public function create(): Response
    {
        $categories = PropertyCategory::query()->get();
        return Inertia::render('Admin/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $attributes = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'description' => 'required',
            'amenities' => 'required|array',
            'amenities.*.value' => 'required|string|max:255',
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

        $amenities = $request['amenities'];

        if ($amenities) {
            foreach ($amenities as $amenity) {
                $value = $amenity['value'];
                Amenities::query()->create([
                    'property_id' => $property->id,
                    'amenity' => $value
                ]);
            }
        }

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

    public function viewCategoryPage(): Response
    {
        return Inertia::render('Admin/Categories', [
            'categories' => $this->categories
        ]);
    }

    public function createCategory(Request $request): void
    {
        $attributes = $request->validate([
            'title' => 'required|string',
            'description' => 'required|max:256',
            'image' => 'required'
        ]);

        $category = PropertyCategory::query()->create([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
        ]);

        if ($request->has('image')) {
            $image = $request->file('image')[0];
            $path = $image->store('uploads/categoryImages', 'public');

            CategoryImage::query()->create([
                'property_category_id' => $category->id,
                'path' => $path
            ]);
        };
    }

    public function deleteProperties($id): void
    {
        $property = Property::query()->with(['images', 'amenities'])->findOrFail($id);
        $amenities = Amenities::query()->where('property_id', $id)->get();
        $images = PropertyImage::query()->where('property_id', $id)->get();

        if ($images) {
            foreach ($images as $image) {
                Storage::disk('public')->delete($image->path);
            }
        }

        $property->delete();
    }

    public function destroy($id): void
    {
        $category = PropertyCategory::query()->with('image')->findOrFail($id);
        $categoryImage = CategoryImage::query()->where('property_category_id', $category->id)->first();
        if ($categoryImage) {
            Storage::disk('public')->delete($categoryImage->path);
        }

        $category->delete();
    }
}
