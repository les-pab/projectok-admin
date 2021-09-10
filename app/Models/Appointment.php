<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Appointment extends Model
{
    protected $collection = 'appointment';
    protected $primaryKey = '_id';
    protected $fillable = [
        'date',
        'time',
        'counselor_id',
        'slot_id',
        'status',
        'link'
    ];

    public function counselor()
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
