<?php

namespace App\Http\Controllers;

use App\Models\Ched;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ChedController extends Controller
{
    public function show($_id)
    {
        $admin = Ched::find($_id);
        return response()->json([$admin], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'last_name' => ['required'],
            'first_name' => ['required'],
            'middle_name' => ['required'],
            'email' => ['required', 'email'],
            'contact' => ['required'],
            'password' => ['required', 'confirmed', 'min:8'],
            'password_confirmation' => ['required', 'same:password', 'min:8']
        ]);

        $user = Ched::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'contact' => $request->contact,
        ])->user()->create([
            'username' => $request->email,
            'password' => Hash::make($request->password),
            'type' => "ched"
        ]);

        $credentials = ['username' =>  $request->email, 'password' => $request->password];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $type = $user->type;
            $user = Ched::where('_id', $user->ched_id)->first();

            return response()->json([
                'success' => true,
                '_id' => $user->_id,
                'type' => $type,
            ], 200);
        }
    }
}
