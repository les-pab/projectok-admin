<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use App\Models\School;
use App\Models\Ched;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required', 'min:8']
        ]);

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $type = $user->type;
            $user = $type == "ched" ?  Ched::where('_id', $user->ched_id)->first() : School::where('_id', $user->admin_id)->first();
            return response()->json([
                'success' => true,
                '_id' => $user->_id,
                '_type' => $type,
            ], 200);
        }

        return response()->json(['success' => false], 401);
    }
}
