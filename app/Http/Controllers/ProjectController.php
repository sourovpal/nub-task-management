<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        $limit = $request->input('limit', 25);

        $search = $request->input('search', null);

        $projects = Project::with('user')
            ->orderBy('id', 'DESC')
            ->when(
                $search,
                function ($query)
                use ($search) {
                    $query->where('title', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('phone', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
                }
            )
            ->paginate($limit);

        return response()->json($projects, Response::HTTP_OK);
    }

    public function find(Request $request)
    {
        $project = Project::where('id', $request->id)->firstOrFail();

        return response()->json($project, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date',
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
        ]);

        $attributes = array_merge(
            $request->only(['title', 'description', 'name', 'email', 'phone', 'start_date', 'due_date']),
            ['user_id' => $this->user->id]
        );

        Project::create($attributes);

        return response()->json([
            'message' => 'Project created successfully.',
        ], Response::HTTP_CREATED);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date',
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
        ]);

        $project = Project::findOrFail($id);
        $project->update($request->all());

        return response()->json([
            'message' => 'Project updated successfully.',
        ], Response::HTTP_OK);
    }
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'message' => 'Project updated successfully.',
        ], Response::HTTP_OK);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);
        return view('projects.show', compact('project'));
    }
}
