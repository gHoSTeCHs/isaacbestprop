<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PropertyCategoryController extends Controller
{
    //
    public function index(): Response
    {
        $categories = PropertyCategory::with('image')->get();
        return Inertia::render('Categories', [
            'categories' => $categories
        ]);
    }

    public function getPropertiesByCategory(Request $request): JsonResponse|Response
    {
        $title = $request->title;
        $category = PropertyCategory::query()->where('title', $title)->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        };
        $properties = Property::query()
            ->where('property_category_id', $category->id)
            ->with('images')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Properties', [
            'properties' => $properties
        ]);

        // return \response()->json($properties);

    }
}
