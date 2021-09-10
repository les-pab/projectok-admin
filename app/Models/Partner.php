<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Partner extends Model
{
    protected $collection = 'partner';
    protected $primaryKey = '_id';
}
