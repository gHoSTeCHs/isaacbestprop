<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public $galleryCategories;
    public $allImages;

    public function __construct()
    {
        $this->galleryCategories = Gallery::all();
        $this->allImages = GalleryImage::all();
    }

    public function index()
    {
        return Inertia::render('Gallery', [
            'galleryCategories' => $this->galleryCategories,
            'galleryImages' => $this->allImages,
        ]);
    }

    public function show(string $title)
    {
        $selectedCategory = $this->galleryCategories->where('category', $title)->first();
        $selectedGalleryImages = $this->allImages->where('gallery_id', $selectedCategory->id);
        return Inertia::render('Gallery', [
            'galleryCategories' => $this->galleryCategories,
            'galleryImages' => $selectedGalleryImages,
        ]);

    }
}
