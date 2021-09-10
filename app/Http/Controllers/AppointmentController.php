<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['student', 'counselor'])->where('status', '=', 'canceled')->orWhere('status', '=', 'completed')->orderBy('date', 'desc')->get();
        return response()->json([$appointments], 200);
    }

    public function filter(Request $request)
    {
        $query = Appointment::query()->where('status', '=', 'canceled')->orWhere('status', '=', 'completed')->orderBy('date', 'desc');

        if (count($request->filters) > 0) {
            $query->where($request->filters);
        }

        if (count($request->student_filters) > 0) {
            $query->with(['student' => function ($query) use ($request) {
                $query->where(
                    $request->student_filters
                );
            }]);
        } else {
            $query->with('student');
        }

        if (count($request->counselor_filters) > 0) {
            $query->with(['counselor' => function ($query) use ($request) {
                $query->where(
                    $request->counselor_filters
                );
            }]);
        } else {
            $query->with('counselor');
        }

        $appointments = $query->get();
        return response()->json([$appointments], 200);
    }
}
