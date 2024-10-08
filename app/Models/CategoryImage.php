<?php

namespace App\Models;

use Database\Factories\CategoryImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryImage extends Model
{
    /** @use HasFactory<CategoryImageFactory> */
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(PropertyCategory::class);
    }
}
