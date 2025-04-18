<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = app(User::class);

        $token = $user->createToken('crm-login-access-token')->plainTextToken;

        // if ($user->is_active == 0)
        //     return response()->json([
        //         'message' => 'Your account is inactive. Please contact support for assistance.',
        //     ], Response::HTTP_FORBIDDEN);

        $payload = [
            'data' => $user,
            "token" => $token,
        ];

        return response()->json($payload);
    }

    public function logout(Request $request)
    {
        // Implement logout logic here
    }
    public function register(Request $request)
    {
        // Implement registration logic here
    }
}
