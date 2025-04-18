<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Hash;

class CheckLoginCredentialRule implements ValidationRule
{

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $password = request()->input('password');

        $user = User::withoutGlobalScopes()
            ->where('email', $value)
            ->first();

        if (!$user) {
            $fail($attribute, "The username or email address does not exist.");
            return;
        }

        if ($password && $user && !Hash::check($password, $user->password)) {
            $fail('password', "The password does not match. Please try again.");
            return;
        }

        if (
            Hash::check($password, $user->password) &&
            ($user && ($user->username == $value || $user->email == $value))
        ) {
            app()->instance(User::class, $user);
        }
    }
}
