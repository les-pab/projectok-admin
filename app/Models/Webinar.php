<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Webinar extends Model
{
    // use HasFactory;

    protected $collection = 'webinar';
    protected $primaryKey = '_id';
    protected $fillable = [
        'title',
        'date',
        'time',
        'link',
    ];

    public function counselor()
    {
        return $this->belongsTo(Counsellor::class, 'counselor_id');
    }
}
