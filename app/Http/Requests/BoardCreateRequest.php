<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BoardCreateRequest extends BaseRequest
{
    public function rules(): array
    {
        $categories = array_column((array) config('boardcategories'), 'name');

        return [
            'name'      => 'required|string|max:255|unique:boards,name',
            'categorie' => [
                'required',
                'string',
                Rule::in($categories),
            ]
        ];
    }
}
