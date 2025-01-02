<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'employee_id'   => 'nullable|string|unique:users,employee_id,' . $this->route('user.id'),
            'department'    => 'required|integer|exists:departments,id',
            'first_name'    => 'required|string|max:100',
            'last_name'     => 'nullable|string|max:100',
            'email'         => 'required|string|email|unique:users,email,' . $this->route('user.id'),
            'phone_number'  => 'nullable|string|max:25',
            'designation'   => 'nullable|string|max:100',
            'join_date'     => 'nullable|date',
        ];
    }
}
