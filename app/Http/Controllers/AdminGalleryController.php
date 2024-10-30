<?php

namespace App\Http\Controllers;

use App\Models\AdminGallery;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleryCategories = Gallery::all();
        return Inertia::render('Admin/Gallery/Index', ['categories' => $galleryCategories]);
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
        $attributes = $request->validate([
            'category' => 'required',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5048',
        ]);

//        $galleryCategory = Gallery::query()
//            ->where('category', $attributes['category'])
//            ->first();


        if ($attributes['category'] != "") {
            $galleryCategory = Gallery::query()
                ->where('category', $attributes['category'])
                ->first();

            if ($request->has('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('uploads/gallery', 'public');

                    GalleryImage::query()->create([
                        'gallery_id' => $galleryCategory->id,
                        'path' => $path,
                    ]);
                }
            }

        }

    }

    /**
     * Display the specified resource.
     */
    public function show(AdminGallery $adminGallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdminGallery $adminGallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdminGallery $adminGallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdminGallery $adminGallery)
    {
        //
    }
}
