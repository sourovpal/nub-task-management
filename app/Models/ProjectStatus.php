<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectStatus extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function groupTasks()
    {
        return $this->hasMany(ProjectTask::class, 'status_id', 'id')->orderBy('position', 'DESC');
    }
}
