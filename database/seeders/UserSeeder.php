<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::where('email', 'admin@gmail.com')->first()) return;
        $department = Department::create([
            'name' => 'Admin',
            'short_name' => 'AD'
        ]);

        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'department_id' => $department->id,
        ]);

        User::create([
            'first_name' => 'Sourov',
            'last_name' => 'Pal',
            'email' => 'sourov@gmail.com',
            'phone_number' => '+8801822022892',
            'password' => bcrypt('12345678'),
            'department_id' => $department->id,
        ]);

        User::create([
            'first_name' => 'Rejaul',
            'last_name' => 'Islam',
            'email' => 'rejaul@gmail.com',
            'password' => bcrypt('12345678'),
            'department_id' => $department->id,
        ]);

        User::create([
            'first_name' => 'Ashikur',
            'last_name' => 'Rahman',
            'email' => 'ashikur@gmail.com',
            'password' => bcrypt('12345678'),
            'department_id' => $department->id,
        ]);

        User::create([
            'first_name' => 'Shanta',
            'last_name' => 'Akter',
            'email' => 'shanta@gmail.com',
            'password' => bcrypt('12345678'),
            'department_id' => $department->id,
        ]);
    }
}
