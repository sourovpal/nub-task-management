<?php

namespace App\Http\Requests;


class DepartmentUpdateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255|unique:departments,name,' . $this->route('department.id'),
            'short_name'  => 'required|string|max:255|unique:departments,short_name,' . $this->route('department.id'),
        ];
    }
}
