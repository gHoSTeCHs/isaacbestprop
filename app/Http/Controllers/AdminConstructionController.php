<?php

namespace App\Http\Controllers;

use App\Models\AdminConstruction;
use App\Models\Construction;
use App\Models\ConstructionImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminConstructionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Construction/Index', []);
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
        $attributes = request()->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'youtube_url' => 'required',
            'images' => 'required',
        ]);

        $document = Construction::query()->create([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'price' => $attributes['price'],
            'youtube_url' => $attributes['youtube_url'],
        ]);

        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('uploads/construction', 'public');
                ConstructionImage::query()->create([
                    'construction_id' => $document->id,
                    'path' => $path,
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AdminConstruction $adminConstruction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdminConstruction $adminConstruction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdminConstruction $adminConstruction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdminConstruction $adminConstruction)
    {
        //
    }
}
