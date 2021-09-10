<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Counselor extends Model
{
    // use HasFactory;
    protected $collection = 'counselor';
    protected $primaryKey = '_id';
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'address',
        'degree',
        'hei',
        'designation',
        'contact',
        'email'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'counselor_id', '_id');
    }

    public function appointment()
    {
        return $this->hasMany(Appointment::class, 'counselor_id', '_id');
    }
}
