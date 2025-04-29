<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Project;
use App\Models\ProjectTask;
use App\Models\User;
use Illuminate\Http\Request;

class DashoboardController extends Controller
{
    public function index()
    {
        $payload = [];

        $payload['total_users'] = User::count();
        $payload['total_projects'] = Project::count();
        $payload['total_departments'] = Department::count();
        $payload['total_tasks'] = ProjectTask::count();

        $payload['tasks'] = ProjectTask::with('status')->limit(30)->latest()->get();

        return response()->json($payload);
    }
}
