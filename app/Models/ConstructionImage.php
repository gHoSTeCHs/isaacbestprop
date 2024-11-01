<?php

namespace App\Models;

use Database\Factories\ConstructionImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConstructionImage extends Model
{
    /** @use HasFactory<ConstructionImageFactory> */
    use HasFactory;

    protected $guarded = [];

    public function construction()
    {
        return $this->belongsTo(Construction::class);
    }
}
