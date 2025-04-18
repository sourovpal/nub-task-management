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

        $search = $request->input('search', '');

        $projects = Project::orderBy('position', 'asc')->paginate($limit);

        return response()->json([
            'data' => $projects->items(),
            'pagination' => pagination($projects),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'nullable|string',
        ]);

        Project::create($request->all());

        return response()->json([
            'message' => 'Project created successfully.',
        ], Response::HTTP_CREATED);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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
    public function sort(Request $request)
    {
        $projectIds = $request->input('project_ids');
        
        foreach ($projectIds as $position => $id) {
            Project::where('id', $id)->update(['position' => $position]);
        }

        return response()->json(['success' => true]);
    }
    public function show($id)
    {
        $project = \App\Models\Project::findOrFail($id);
        return view('projects.show', compact('project'));
    }
}
