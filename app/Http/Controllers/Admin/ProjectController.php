<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Illuminate\Support\Str;

use function PHPUnit\Framework\directoryExists;

class ProjectController extends Controller
{
    protected $dicard = [];
    protected $col_list = [];
    protected $cols = [];

    public function __construct()
    {
        $this->discard = ['id', 'slug', 'updated_at', 'created_at'];
        $this->col_list = Schema::getColumnListing('projects');
        $this->cols = array_diff($this->col_list, $this->discard);
    }
    public function Project(Request $request)
    {
        // remove 
        if (isset($request->remove) && $request->remove == true && isset($request->projectId)) {
            // also delete project folder 
            $project = Project::findorFail($request->projectId);
            $directory = public_path('/images/projects/project_' . $project->id);
            if (directoryExists($directory)) {
                File::deleteDirectory($directory);
            }
            Project::destroy($request->projectId);
        }
        // get 
        $projects = Project::latest()->get();
        $compact = ['projects' => $projects, 'cols' => $this->cols];
        return Inertia::render('Admin/Project', $compact);
    }

    public function detailProject(Request $request)
    {
        $compact = [];
        if (isset($request->id)) {
            $id = $request->id;
            $project = Project::find($id);
            $compact['project'] = $project;
        }
        $compact['cols'] = $this->cols;
        return Inertia::render('Admin/ProjectDetail', $compact);
    }

    public function saveProject(Request $request)
    {
        if ($request->isMethod('post')) {
            // dd($request->all());
            //validation 
            $request->validate([
                'title' => 'required | max: 250',
                'thumbnail' => 'required',
                'description' => 'required | min:100'
            ]);
            if (isset($request->id)) {
                // update 
                $project = Project::find($request->id);
                $project->update($request->except('_token', 'slug', 'thumbnail', 'images', 'created_at', 'updated_at'));
                $project->slug = Str::slug($request->title, "-");
                $project->save();
            } else {
                // add new
                $project =  Project::create($request->except('_token', 'slug', 'thumbnail', 'images'));
                $project->slug = Str::slug($request->title, "-");
                $project->save();
            }
            // upload thumbnail and images 
            $destinationPath = '/images/projects/project_' . $project->id . '/';
            if ($request->hasFile('thumbnail')) {
                $filename = 'project_thumbnail_' . $project->id . '.' . $request->file('thumbnail')->getClientOriginalExtension();

                $request->file('thumbnail')->move(public_path() . $destinationPath, $filename);
                $project->thumbnail = $destinationPath . $filename;
                $project->save();
            }
            if ($request->hasFile('images')) {
                // clear previous images
                if (isset($request->id)) {
                    $oldfiles = explode(', ', $project->images);
                    foreach ($oldfiles as $old) {
                        if (file_exists(public_path() . $old)) {
                            unlink(public_path($old));
                        }
                    }
                }

                $c = 1;
                $images = '';
                foreach ($request->file('images') as $file) {
                    $imagename = 'project_image_' . $project->id . '_' . $c . '.' . $file->getClientOriginalExtension();
                    $file->move(public_path() . $destinationPath, $imagename);
                    $images .= $destinationPath . $imagename . ', ';
                    $c++;
                }
                $project->images = substr($images, 0, strlen($images) - 2);
                $project->save();
            }

            return Redirect::route('admin.project');
        }
    }
}
