<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function message(Request $request)
    {
        if (isset($request->remove) && $request->remove == true && isset($request->messageId)) {
            Message::destroy($request->messageId);
        }
        $discard = ['id', 'service', 'updated_at', 'created_at'];
        $col_list = Schema::getColumnListing('messages');
        $cols = array_diff($col_list, $discard);
        $messages = Message::latest()->get();
        // Session::flash('message', 'Message deleted');
        $compact = ['messages' => $messages, 'cols' => $cols];
        return Inertia::render('Admin/Message', $compact);
    }

    public function deleteMessage($messageId)
    {
        Message::destroy($messageId);

        return Redirect::route('admin.message')->withErrors(['success' => "deleted"]);;
    }
}
