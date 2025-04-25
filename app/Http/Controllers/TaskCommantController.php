<?php

namespace App\Http\Controllers;

use App\Models\TaskCommant;
use Illuminate\Http\Request;

class TaskCommantController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        $id = $request->id;

        $commants = TaskCommant::with('user')->where('task_id', $id)->get();

        return response()->json($commants);
    }

    public function create(Request $request)
    {
        $id = $request->id;
        $message = $request->message;

        TaskCommant::create([
            'task_id' => $id,
            'user_id' => $this->user->id,
            'message' => $message,
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
