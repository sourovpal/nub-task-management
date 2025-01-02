<?php

use Illuminate\Pagination\LengthAwarePaginator;

function pagination(LengthAwarePaginator $instance)
{
    return [
        'from' => $instance->firstItem() ?? 0,
        'to' => $instance->lastItem() ?? 0,
        'current_page' => $instance->currentPage(),
        'next_page' => $instance->currentPage() < $instance->lastPage() ? $instance->currentPage() + 1 : null,
        'prev_page' => $instance->currentPage() > 1 ? $instance->currentPage() - 1 : null,
        'last_page' => $instance->lastPage(),
        'total' => $instance->total(),
    ];
}
