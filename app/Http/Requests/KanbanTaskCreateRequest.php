<?php

namespace App\Http\Requests;


class KanbanTaskCreateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'title'      => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
            'status_id'  => 'required|exists:kanban_statuses,id'
        ];
    }
}
