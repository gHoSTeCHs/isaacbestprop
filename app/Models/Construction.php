<?php

namespace App\Models;

use Database\Factories\ConstructionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    /** @use HasFactory<ConstructionFactory> */
    use HasFactory;

    protected $guarded = [];

    public function images(){
        return $this->hasMany(ConstructionImage::class);
    }
}
