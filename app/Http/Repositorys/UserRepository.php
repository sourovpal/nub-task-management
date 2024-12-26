<?php

namespace App\Http\Repositorys;

use App\Models\User;

class UserRepository
{

    public static function all(?array $select = null, int $limit = 20): object
    {
        return User::query()
            ->when(
                $select,
                function ($query)
                use ($select) {
                    $query->select($select);
                }
            )
            ->paginate($limit);
    }
}
