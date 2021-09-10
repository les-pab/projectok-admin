<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Ched extends Model
{
    use HasFactory;

    protected $collection = 'ched';
    protected $primaryKey = '_id';
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'email',
        'contact',
        'position'

    ];

    public function user()
    {
        return $this->hasOne(User::class, 'ched_id', '_id');
    }
}
