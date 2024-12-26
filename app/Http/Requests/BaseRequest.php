<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class BaseRequest extends FormRequest
{

    private $position = 'toast';

    public function alertVisible($position = 'toast')
    {
        $this->position = $position;
    }

    // public function authorize(): bool
    // {
    //     return false;
    // }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'alert' => [
                    'type' => 'error',
                    'message' => $validator->errors()->first(),
                    'position' => $this->position
                ],
                'errors' => $validator->getMessageBag()
            ], Response::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
}
