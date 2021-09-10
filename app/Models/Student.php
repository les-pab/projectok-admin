<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Student extends Model
{
    protected $collection = 'student';
    protected $primaryKey = '_id';
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'university',
        'email'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'student_id', '_id');
    }

    public function appointment()
    {
        return $this->hasMany(Appointment::class, 'student_id', '_id');
    }
}
