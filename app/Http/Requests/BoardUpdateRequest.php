<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BoardUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:boards,name,' . $this->route('board'),
        ];
    }
}
