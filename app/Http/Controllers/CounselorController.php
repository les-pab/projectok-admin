<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Counselor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CounselorController extends Controller
{
    public function index()
    {
        $counselors = Counselor::with(['appointment'])->get();
        return response()->json([$counselors], 200);
    }

    public function filter(Request $request)
    {

        $query = Counselor::query();

        if (count($request->filters) > 0) {
            $query->where($request->filters);
        }

        $counselors = $query->with(['appointment'])->get();
        return response()->json([$counselors], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'last_name' => ['required'],
            'first_name' => ['required'],
            'middle_name' => ['required'],
            'email' => ['required', 'email'],
            'contact' => ['required'],
            'designation' => ['required'],
            'hei' => ['required'],
            'address' => ['required'],
            'password' => ['required', 'confirmed', 'min:8'],
            'password_confirmation' => ['required', 'same:password', 'min:8']
        ]);

        Counselor::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'contact' => $request->contact,
            'designation' => $request->designation,
            'hei' => $request->hei,
            'address' => $request->address,
        ])->user()->create([
            'username' => $request->email,
            'password' => Hash::make($request->password),
            'type' => "counselor"
        ]);

        $counselors = Counselor::with(['appointment'])->get();
        return response()->json([$counselors], 200);
    }

    public function update(Request $request)
    {
        $request->validate([
            'username' => ['required', 'min:8'],
            'password' => ['required', 'min:8'],
        ]);

        User::where('counselor_id', $request->counselor_id)->update([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([], 200);
    }

    public function delete($_id)
    {
        Counselor::where('_id', '=', $_id)->delete();
        Appointment::where('counselor_id', '=', $_id)->delete();
        User::where('counselor_id', '=', $_id)->delete();

        $counselors = Counselor::with(['appointment'])->get();
        return response()->json([$counselors], 200);
    }
}
