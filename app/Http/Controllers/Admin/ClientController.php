<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ClientController extends Controller
{
    protected $dicard;
    protected $col_list;
    protected $cols;

    public function __construct()
    {
        $this->discard = ['id', 'updated_at', 'created_at'];
        $this->col_list = Schema::getColumnListing('clients');
        $this->cols = array_diff($this->col_list, $this->discard);
    }

    public function index(Request $request)
    {
        if (isset($request->remove) && $request->remove == true && isset($request->clientId)) {
            $client = Client::findorFail($request->clientId);
            //delete logo;
            if(file_exists(public_path($client->logo))){
                unlink(public_path($client->logo));
            }
            Client::destroy($request->clientId);
        }

        $clients = Client::latest()->get();
        $compact = ['clients' => $clients, 'cols' => $this->cols];
        return Inertia::render('Admin/Client', $compact);
    }

    public function show(Request $request)
    {
        $compact = [];
        if (isset($request->id)) {
            $id = $request->id;
            $client = Client::find($id);
            $compact['client'] = $client;
        }
        $compact['cols'] = $this->cols;
        return Inertia::render('Admin/ClientDetail', $compact);
    }

    public function store(Request $request)
    {
        if ($request->isMethod('post')) {

            //validation 
            $request->validate([
                'title' => 'required',
                'logo' => 'required',
                'state' => 'required'
            ]);
            if (isset($request->id)) {
                // update 
                $client = Client::find($request->id);
                $client->update($request->except('_token','logo', 'created_at', 'updated_at'));
                $client->save();
            } else {
                // add new
                $client =  Client::create($request->except('_token', 'logo'));
                $client->save();
            }
            // upload thumbnail and images 
            $destinationPath = '/images/clients/';
            if ($request->hasFile('logo')) {
                $filename = 'client_logo_' . $client->id . '.' . $request->file('logo')->getClientOriginalExtension();

                $request->file('logo')->move(public_path() . $destinationPath, $filename);
                $client->logo = $destinationPath . $filename;
                $client->save();
            }
           

            return Redirect::route('admin.client');
        }
    }
}
