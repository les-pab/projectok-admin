<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
class LogoutController extends Controller
{
    use AuthenticatesUsers;

    public function logout()
    {
        Auth::logout();

        return response()->json([], 200);
    }
}
