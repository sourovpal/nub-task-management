<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardCreateRequest;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BoardController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {

        $limit = $request->get('limit', 30);

        $boards = Board::paginate($limit);

        return response()->json([
            'boards' => $boards->items(),
            'pagination'  => $boards->items(),
        ]);
    }

    public function find(Board $board)
    {
        return response()->json($board->only(['id', 'name']));
    }

    public function show(Board $board)
    {
        return response()->json($board->only(['id', 'name']));
    }

    public function create(BoardCreateRequest $request)
    {
        $category = collect((array) config('boardcategories'))->firstWhere('name', $request->categorie);

        $attributes = array_merge(
            $request->validated(),
            [
                'allow_checked' => $category->allow_checked,
                'slug'          => Str::slug($request->name),
                'catetorie'     => $category->name,
                'owner_id'      => $this->user->id,
            ]
        );
    }

    public function update(Board $board)
    {
        return response()->json($board->only(['id', 'name']));
    }

    public function delete(Board $board)
    {
        return response()->json($board->only(['id', 'name']));
    }
}
