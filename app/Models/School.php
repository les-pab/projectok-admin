<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $collection = 'school';
    protected $primaryKey = '_id';
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'email',
        'contact',
        'position',
        'hei'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'school_id', '_id');
    }
}
