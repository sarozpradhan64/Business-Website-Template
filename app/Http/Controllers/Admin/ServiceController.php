<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Service;

class ServiceController extends Controller
{
    protected $discard = [];
    protected $col_list = [];
    protected $cols = [];

    public function __construct()
    {
        $this->discard = ['id', 'updated_at', 'created_at'];
        $this->col_list = Schema::getColumnListing('services');
        $this->cols = array_diff($this->col_list, $this->discard);
    }

    public function Service(Request $request)
    {

        if (isset($request->remove) && $request->remove == true && isset($request->serviceId)) {
            Service::destroy($request->serviceId);
        }
        $discard = ['id', 'updated_at', 'created_at'];
        $col_list = Schema::getColumnListing('services');
        $cols = array_diff($col_list, $discard);
        $services = Service::latest()->get();
        $compact = ['services' => $services, 'cols' => $cols];
        return Inertia::render('Admin/Service', $compact);
    }

    public function detailService(Request $request)
    {   $compact = [];
        if (isset($request->id)) {
            $id = $request->id;
            $service = Service::find($id);
            $compact['service'] = $service;
        } 
        $compact['cols'] = $this->cols;
        return Inertia::render('Admin/ServiceDetail', $compact);
    }

    public function saveService(Request $request)
    {
        if ($request->isMethod('post')) {
            //validation 
            $request->validate([
                'title' => 'required | max:100',
                'icon' => 'required | max:250',
                'description' => 'required'
            ]);
            if (isset($request->id)) {
                // update 
                Service::find($request->id)->update($request->except('_token', 'created_at', 'updated_at'));
                Session::flash('message', 'Service '.$request->title.' updated !');
            } else {
                // add new
                Service::create($request->except('_token'));
                Session::flash('message', 'New Service '.$request->title.' added !');
            }
            return Redirect::route('admin.service');
        }
    }

    public function deleteService($serviceId)
    {
        Service::destroy($serviceId);
        Session::flash('deleted', 'Service deleted !');
        return back();
    }
}
