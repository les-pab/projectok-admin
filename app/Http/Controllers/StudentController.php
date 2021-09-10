<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with('appointment')->get();
        return response()->json([$students], 200);
    }

    public function filter(Request $request)
    {
        // dd($request->filters);

        $query = Student::query();

        // foreach ($request->filters as $filter) {
        //     $query->where($filter[0], $filter[1], $filter[2]);
        // }

        if (count($request->filters) > 0) {
            $query->where($request->filters);
        }

        // dd($query->with('appointment')->get());

        $students = $query->with('appointment')->get();
        return response()->json([$students], 200);
    }
}
