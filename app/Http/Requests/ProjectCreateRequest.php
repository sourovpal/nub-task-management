<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class ProjectCreateRequest extends BaseRequest
{
    public function rules(): array
    {
        $categories = (array) array_column((array) config('projectcategories'), 'name');

        return [
            'name'      => 'required|string|max:255|unique:projects,name',
            'categorie' => [
                'required',
                'string',
                Rule::in($categories),
            ]
        ];
    }
}
