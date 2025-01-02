<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KanbanStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'position',
        'project_id',
    ];
}
