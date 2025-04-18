<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project = new Project();
        $project->name = 'Project 1';
        $project->description = 'Description 1';
        $project->categorie = 'Categorie 1';
        $project->slug = 'project-1';

        $project->save();

        $culumns = [
            []
        ];
    }
}
