<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CompanyInfoController extends Controller
{
    public function CompanyInfo(Request $request)
    {

        // companyinfos table is supposed to  have only one record 
        $info = CompanyInfo::get()->first();
        $errormsg = '';
        if (empty($info)) {
            $errormsg = 'Please update  your company info !';
        };
        $discard = ['id', 'service', 'updated_at', 'created_at'];
        $col_list = Schema::getColumnListing('company_infos');
        $cols = array_diff($col_list, $discard);
        $compact = ['info' => $info, 'cols' => $cols, 'errormsg' => $errormsg];

        return Inertia::render('Admin/CompanyInfo', $compact);
    }

    public function saveInfo(Request $request)
    { // companyinfos table is supposed to  have only one record 
        if ($request->isMethod('post')) {
            $request->validate([
                //  'company_logo' => 'required|mimes:jpg,png,jpeg',
                'company_name' => 'required',
                'company_slogan' => 'required',
                'about_us' => 'required',
                'email' => 'required'

            ]);
            if (isset($request->id)  && !empty(CompanyInfo::find($request->id))) {
                $company =   CompanyInfo::find($request->id);
                $company->update($request->except('_token', 'id', 'updated_at', 'created_at'));
            } else {
                $company = CompanyInfo::create($request->except('_token'));
            }

            // saving the company logo 
            if ($request->hasFile('company_logo')) {
                $filename = 'company_logo.' . $request->file('company_logo')->getClientOriginalExtension();
                $destinationPath = '/images/company/';
                $request->file('company_logo')->move(public_path() . $destinationPath, $filename);
                $company->company_logo = $destinationPath . $filename;
                $company->save();
            }
            Session::flash('message', "Company Info Updated !");
        }
        return Redirect::route('admin.companyInfo');
    }
}
