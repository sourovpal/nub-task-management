<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'task_users',
            'task_id',
            'user_id',
            'id',
            'id',
        );
    }
}
