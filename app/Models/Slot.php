<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Slot extends Model
{
    protected $collection = 'slot';
    protected $primaryKey = '_id';
    protected $fillable = [
        'date',
        'time',
        'available'
    ];

    public function availability()
    {
        return $this->belongsTo(Availability::class, "availability_id");
    }

    public function appointment()
    {
        return $this->hasOne(Appointment::class, 'slot_id');
    }
}
