<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function Index()
    {
        return Inertia::render('Admin/CompanyInfo');
    }

  
 
}
