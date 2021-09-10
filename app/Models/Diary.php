<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Diary extends Model
{
    protected $collection = 'diary';
    protected $primaryKey = '_id';
    protected $fillable = [
        'date',
        'title',
        'content',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
