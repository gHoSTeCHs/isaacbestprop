<?php

namespace App\Models;

use Database\Factories\PropertyCategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PropertyCategory extends Model
{
    /** @use HasFactory<PropertyCategoryFactory> */
    use HasFactory;

    protected $guarded = [];

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function image(): HasOne
    {
        return $this->hasOne(CategoryImage::class);
    }
}
