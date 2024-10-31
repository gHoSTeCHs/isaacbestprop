<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Construction/Index', []);
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
    public function show(Construction $construction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Construction $construction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Construction $construction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Construction $construction)
    {
        //
    }
}
