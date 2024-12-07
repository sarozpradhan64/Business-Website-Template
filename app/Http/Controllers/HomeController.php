<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\CompanyInfo;
use App\Models\Message;
use App\Models\Project;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function Home()
    {
        $services = Service::where('state', 'on')->orderBy('title', 'ASC')->get();
        $clients = Client::where('state', 'on')->get();
        $projects = Project::where('state', 'on')->latest()->limit(3)->get();
        $data = ['services' => $services, 'clients' => $clients, 'projects' => $projects];
        return Inertia::render('Home', $data);
    }

    public function About()
    {
        return Inertia::render('About');
    }

    public function Projects()
    {
        $projects = Project::where('state', 'on')->latest()->paginate(5);
        $data = ['projects' => $projects];
        return Inertia::render('Project', $data);
    }

    public function ProjectDetail($slug)
    {
        try {
            $project = Project::where('slug', $slug)->first();
            $other_projects = Project::whereNotIn('id', [$project->id])->where('state','on')->inRandomOrder()->limit(8)->get();
            $data = ['project' => $project, 'other_projects' => $other_projects];
            return Inertia::render('ProjectDetail', $data);
        } catch (Exception) {
            return abort(404);
        }
    }

    public function Contact(Request $request)
    {
        if ($request->isMethod('post')) {
            $request->validate([
                'name' => 'required',
                'phone' => 'required',
                'message' => 'required'
            ]);
            Message::create($request->except('_token'));
            Session::flash('message', 'Thank you for your message');
            return redirect('/contact');
        }
        // getting column list field for contact form 
        $discard = ['id', 'updated_at', 'created_at'];
        $col_list = Schema::getColumnListing('messages');
        $cols = array_diff($col_list, $discard);
        $servies = Service::where('state', 'on')->orderBy('title', 'ASC')->get('title');
        $data = ['cols' => $cols, 'services' => $servies];
        return Inertia::render('Contact', $data);
    }
}
