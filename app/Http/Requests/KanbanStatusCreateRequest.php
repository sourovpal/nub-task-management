<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KanbanStatusCreateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'       => 'required|string|max:255|unique:kanban_statuses,name',
            // 'name'       => 'required|string|max:255',
            'color'      => 'required|string|max:255',
            "project_id" => 'required|exists:projects,id'
        ];
    }
}
