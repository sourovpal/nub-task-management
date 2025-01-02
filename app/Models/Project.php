<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'categorie',
        'slug',
        'owner_id',
        'allow_checked',
    ];

    public function owner()
    {
        return $this->hasOne(User::class, 'id', 'owner_id');
    }
}
