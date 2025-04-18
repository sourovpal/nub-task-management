<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;
use App\Rules\CheckLoginCredentialRule;

class LoginRequest extends BaseRequest
{
    public function rules(): array
    {
        return [

            'email' => [
                'required',
                'string',
                'max:255',
                new CheckLoginCredentialRule
            ],

            'password' => [
                'required',
                'string',
                'max:255',
            ]

        ];
    }
}
