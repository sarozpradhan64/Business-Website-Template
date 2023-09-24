<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChangePasswordController extends Controller
{
    public function changePassword(Request $request)
    {
        $wrong = '';
        if ($request->isMethod('post')) {
            $request->validate(
                [
                    'old_password' => 'required',
                    'new_password' => 'required',
                    'confirm_password' => 'required|same:new_password',

                ]
            );

            //checking old vs new password
            if (Hash::check($request->old_password, Auth::user()->password)) {
                $id = Auth::id();
                $update = User::find($id);
                $update->email = $request->email;
                $update->password = Hash::make($request->new_password);
                $update->save();
                session()->flash('message', 'Your password is updated, Login Again !!');

                return Redirect::route('logout');
            } else {
                $wrong = 'You entered wrong old password';
                $compact = ['wrong'=>$wrong];
                return Inertia::render('Auth/ChangePassword', $compact);
            }
        } else {
            $compact = ['wrong'=>$wrong];
            return Inertia::render('Auth/ChangePassword', $compact);
        }
    }
}
