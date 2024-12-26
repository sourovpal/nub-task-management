<?php

namespace App\Http\Controllers;

use App\Http\Repositorys\UserRepository;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(Request $request)
    {
        $users = UserRepository::all();

        return response()->json([
            'users' => $users->items(),
            'pagination' => $users->pagination()
        ]);
    }

    public static function find(User $user, int $id)
    {
        return response()
            ->json($user->only([
                'id',
                'name',
                'email'
            ]));
    }

    public static function show(User $user, int $id)
    {
        return response()
            ->json($user->only([
                'id',
                'name',
                'email'
            ]));
    }

    public static function create(UserCreateRequest $request)
    {
        $attributes = (array) $request->validated();

        $attributes = array_merge(
            $attributes,
            [
                'password' => Hash::make($request->password)
            ]
        );

        $user = User::create($attributes);

        return response()->json($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());

        return response()->json([
            'alert' => [
                'type' => 'success',
                'message' => 'User updated successfully.',
                'position' => 'toast'
            ]
        ]);
    }

    public function delete(User $user)
    {
        $user->delete();

        return response()->json([
            'alert' => [
                'type' => 'success',
                'message' => 'User deleted successfully.',
                'position' => 'toast'
            ]
        ]);
    }
}
