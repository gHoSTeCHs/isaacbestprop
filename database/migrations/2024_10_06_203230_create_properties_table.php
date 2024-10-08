<?php

use App\Models\PropertyCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PropertyCategory::class)->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('description');
            $table->string('location');
            $table->unsignedInteger('bathrooms');
            $table->unsignedInteger('bedrooms');
            $table->unsignedSmallInteger('price');
            $table->string('video_url');
            $table->boolean('sold');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
