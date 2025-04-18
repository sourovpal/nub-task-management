<?php

namespace App\Http\Controllers;

use App\Models\ProjectTask;
use Illuminate\Http\Request;

class ProjectTaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = ProjectTask::where('status_id', $request->id)->orderBy('id', 'desc')->get();
        return response()->json($tasks);
    }


    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'required|integer|exists:project_statuses,id',
        ]);

        $task = ProjectTask::create($payload);
        return response()->json([
            'message' => 'Task created successfully',
        ])->setStatusCode(201);
    }

    public function show($id)
    {
        // Logic to display a specific project task
    }

    public function edit($id)
    {
        // Logic to show the form for editing a specific project task
    }

    public function update(Request $request, $id)
    {
        $payload = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'required|integer|exists:project_statuses,id',
        ]);

        $task = ProjectTask::where('id', $id)->update($payload);

        return response()->json([
            'message' => 'Task updated successfully',
        ])->setStatusCode(201);
    }

    public function destroy($id)
    {
        // Logic to delete a specific project task
    }
}
