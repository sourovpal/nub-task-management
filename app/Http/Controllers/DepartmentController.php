<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentCreateRequest;
use App\Http\Requests\DepartmentUpdateRequest;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        $limit = $request->get('limit', 30);

        $departments = Department::query()
            ->orderBy('created_at', 'DESC')
            ->paginate($limit);

        return response()->json([
            'departments' => $departments->items(),
            'pagination'  => pagination($departments),
        ]);
    }

    public function list(Request $request)
    {

        $departments = Department::query()
            ->orderBy('created_at', 'DESC')
            ->limit(100)
            ->get();

        return $departments;
    }

    public function find(Department $department)
    {
        return response()->json(
            $department->only([
                'id',
                'name',
                'short_name'
            ])
        );
    }

    public function show(Department $department)
    {
        return response()->json(
            $department->only([
                'id',
                'name',
                'short_name'
            ])
        );
    }

    public function create(DepartmentCreateRequest $request)
    {
        $attributes = $request->validated();

        $department = Department::create($attributes);

        return response()->json([
            'alert' => [
                'type' => 'success',
                'message' => 'Department created successfully.',
                'position' => 'toast'
            ],
        ]);
    }

    public function update(DepartmentUpdateRequest $request, Department $department)
    {
        $attributes = $request->validated();

        $department = $department->update($attributes);

        return response()->json([
            'alert' => [
                'type' => 'success',
                'message' => 'Department updated successfully.',
                'position' => 'toast'
            ],
        ]);
    }

    public function delete(Department $department)
    {
        $department->delete();

        return response()->json([
            'alert' => [
                'type' => 'success',
                'message' => 'Department deleted successfully.',
                'position' => 'toast'
            ]
        ]);
    }
}
