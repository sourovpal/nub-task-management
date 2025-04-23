<?php

namespace App\Http\Controllers;

use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatusController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        $search = $request->input('search', null);

        $statuses = ProjectStatus::with(['groupTasks' => function ($query) use ($search) {
            $query->when(
                $search,
                function ($query)
                use ($search) {
                    $query->where('name', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%");
                }
            );
        }])->where('project_id', $request->id)
            ->orderBy('id', 'ASC')->get();
        return response()->json($statuses);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:6',
            'project_id' => 'required',
        ]);
        $status = ProjectStatus::create($validate);
        return response()->json([
            'message' => 'Status created successfully.',
        ], Response::HTTP_CREATED);
    }

    public function update(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:6',
        ]);

        $status = ProjectStatus::where('id', $request->id)->update($validate);

        return response()->json([
            'message' => 'Status updated successfully.',
        ], Response::HTTP_CREATED);
    }
}
