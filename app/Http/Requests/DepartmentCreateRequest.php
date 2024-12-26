<?php

namespace App\Http\Requests;

class DepartmentCreateRequest extends BaseRequest
{

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255|unique:departments,name',
            'short_name'  => 'required|string|max:255|unique:departments,short_name',
        ];
    }
}
