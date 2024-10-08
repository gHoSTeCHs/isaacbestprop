<?php

namespace App\Models;

use Database\Factories\AmenitiesFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Amenities extends Model
{
    /** @use HasFactory<AmenitiesFactory> */
    use HasFactory;

    protected $guarded = [];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
