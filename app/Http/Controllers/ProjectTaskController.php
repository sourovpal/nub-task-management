<?php

namespace App\Http\Controllers;

use App\Models\ProjectTask;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
            'priority' => 'nullable',
            'due_date' => 'nullable',
        ]);

        $payload['position'] = $this->maxPosition($request->status_id) + 1;

        $payload['sl_id'] = ProjectTask::where('status_id', $payload['status_id'])->count() + 1;

        $task = ProjectTask::create($payload);

        return response()->json([
            'message' => 'Task created successfully',
        ]);
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
            'priority' => 'nullable',
            'due_date' => 'nullable',
        ]);

        $task = ProjectTask::find($id);

        $task->update($payload);

        foreach ($request->users as $user) {
            $task->users()->updateExistingPivot($user['id'], $user['pivot']);
        }

        return response()->json([
            'message' => 'Task updated successfully',
        ]);
    }

    public function maxPosition($status_id)
    {
        return ProjectTask::where('status_id', $status_id)->max('position');
    }

    public function updatePosition(Request $request)
    {
        $status_id = $request->status_id;
        $task_id = $request->task_id;
        $action = $request->action;
        $position = (int) $request->position;
        $max = $this->maxPosition($status_id);

        if ($position == 1) {
            ProjectTask::where('id', $task_id)->update(['position' => $max + 1, 'status_id' => $status_id]);
        } else if ($action == 'swap') {

            $old_position = $request->old_position;

            $temp = ProjectTask::where('id', $task_id)->first();

            if ($old_position > $position) {
                // up
                $temp->position = ($max - ($old_position - $position)) + 1;
                $temp->save();
            } else {
                // down
                $temp->position = ($max - $position) + 1;
                $temp->save();
            }
            $tasks = ProjectTask::where('status_id', $status_id)
                ->where('id', '!=', $task_id)
                ->where('position', '>=', $temp->position)
                ->orderBy('position', 'ASC')
                ->get();

            $start = $temp->position;

            foreach ($tasks as $task) {
                $start++;
                $task->update(['position' => $start]);
            }
        } else if ($action == 'move') {

            $temp = ProjectTask::where('id', $task_id)->first();


            $temp->status_id = $status_id;
            $temp->save();

            $tasks = ProjectTask::where('status_id', $status_id)
                ->where('id', '!=', $task_id)
                ->where('position', '>=', $temp->position)
                ->orderBy('position', 'ASC')
                ->get();

            $start = $temp->position;

            foreach ($tasks as $task) {
                $start++;
                $task->update(['position' => $start]);
            }
        }

        return response()->json([
            'message' => 'Task position updated successfully',
        ]);
    }


    public function destroy($id)
    {
        // Logic to delete a specific project task
    }

    public function events(Request $request)
    {
        $tasks = ProjectTask::get();

        $backgroundColors = [
            "#000000",
            "#df00e0",
            "#1abc9c",
            "#3498db",
            "#9b59b6",
            "#e67e22",
            "#e74c3c",
            "#2ecc71",
            "#f39c12",
            "#7f8c8d",
        ];


        $tasks->map(function ($item) use ($backgroundColors) {

            shuffle($backgroundColors);

            $item->title = $item->name;
            $item->start = $item->created_at;
            $item->end   = $item->due_date;
            $item->color = $backgroundColors[0];
            return $item;
        });

        return $tasks;
    }

    public function assignUsers(Request $request)
    {
        $tasks = ProjectTask::where('id', $request->id)->first();
        $tasks->users()->sync((array)$request->users);

        $message = "New Task Assignment: $tasks->name";

        try {
            foreach ($tasks->users as $user) {
                if ($user->phone_number) {
                    $phone = str_replace('+', '', $user->phone_number);
                    Http::get("https://bulksmsbd.net/api/smsapi?api_key=ppfcvYlBPYiqLkDnCGzB&type=text&number=$phone&senderid=8809617625543&message=$message");
                }
            }
        } catch (Exception $error) {
        }

        return response()->json($tasks->users);
    }
}
