<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Availability extends Model
{

    protected $collection = 'availability';
    protected $primaryKey = '_id';
    protected $fillable = [
        'date',
        'time',
        'schedule'
    ];

    public function counselor()
    {
        return $this->belongsTo(Counsellor::class, "counselor_id");
    }

    public function slot()
    {
        return $this->hasMany(Slot::class, "availability_id");
    }
}
