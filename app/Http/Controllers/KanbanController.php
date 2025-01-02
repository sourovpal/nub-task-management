<?php

namespace App\Http\Controllers;

use App\Http\Requests\KanbanStatusCreateRequest;
use App\Http\Requests\KanbanTaskCreateRequest;
use App\Models\KanbanStatus;
use App\Models\Task;
use Illuminate\Http\Request;

class KanbanController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function statuses(Request $request)
    {
        $status = KanbanStatus::query()
            ->where('project_id', $request->project_id)
            ->orderBy('position', 'ASC')
            ->limit(100)
            ->get();

        return response()->json($status);
    }

    public function tasks(Request $request)
    {
        $limit = $request->get('limit', 20);

        $tasks = Task::query()
            ->where('status_id', $request->status_id)
            ->orderBy('position', 'DESC')
            ->paginate($limit);

        return response()->json([
            'tasks' => $tasks->items(),
            'pagination' => pagination($tasks),
        ]);
    }

    public function createStatus(KanbanStatusCreateRequest $request)
    {
        $attributes = array_merge($request->validated(), [
            'position' => self::maxPosition() + 1
        ]);

        KanbanStatus::create($attributes);

        return response()->json([
            'type' => 'success',
            'message' => 'Column created successfully.'
        ]);
    }

    public function createTask(KanbanTaskCreateRequest $request)
    {
        $attributes = array_merge(
            $request->validated(),
            [
                'position' => self::taskMaxPosition($request->status_id) + 1
            ]
        );

        Task::create($attributes);

        return response()->json([
            'type' => 'success',
            'message' => 'Task created successfully.'
        ]);
    }

    public static function taskMaxPosition($status_id)
    {
        return Task::where('status_id', $status_id)->max('position');
    }

    public static function maxPosition()
    {
        return KanbanStatus::max('position');
    }
}
