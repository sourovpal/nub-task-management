<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectCreateRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }


    public function index(Request $request)
    {

        $limit = $request->get('limit', 30);
        $type = $request->get('type', 'recent');

        $projects = Project::query()
            ->with('owner')
            ->when(
                $type == 'recent',
                function ($query) {
                    $query->orderBy('updated_at', 'DESC');
                },
                function ($query) use ($type) {

                    $category = (object) collect((array) config('projectcategories'))->firstWhere('name', $type);

                    $query->when($category, function ($query) use ($type) {

                        $query->where('categorie', $type)->orderBy('updated_at', 'DESC');
                    });
                }
            )->paginate($limit);

        return response()->json([
            'projects' => $projects->items(),
            'pagination'  => pagination($projects),
        ]);
    }


    public function create(ProjectCreateRequest $request)
    {
        $category = (object) collect((array) config('projectcategories'))->firstWhere('name', $request->categorie);

        $attributes = array_merge(
            $request->validated(),
            [
                'allow_checked' => $category->allow_checked,
                'slug'          => Str::slug($request->name),
                'catetorie'     => $category->name,
                'owner_id'      => $this->user->id ?? 1,
            ]
        );

        Project::create($attributes);

        return response()->json([
            'type'    => 'success',
            'message' => 'Project created successfully.',
            'visible' => 'toast'
        ]);
    }

    public function screenshot(Request $request, Project $project)
    {
        if ($request->hasFile('screenshot')) {

            $file = $request->file('screenshot');

            $randomName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            $filePath = $file->storeAs('uploads', $randomName, 'public');

            DB::table('projects')->where('id', $project->id)->update([
                'screenshort' => $filePath,
            ]);

            return response()->json([
                'message' => 'File uploaded and updated successfully!',
                'file_name' => $randomName,
            ]);
        }
    }
}
