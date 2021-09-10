<?php

use App\Http\Controllers\AppointmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\ChedController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\StudentController;
use App\Models\Student;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//ROUTE FOR AUTH
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::get('logout', [LogoutController::class, 'logout'])->name('logout');

//ROUTE FOR CHED
Route::resource('ched', ChedController::class);

//ROUTE FOR STUDENT
Route::get('student', [StudentController::class, 'index'])->name('student.index');
Route::post('student/filter', [StudentController::class, 'filter'])->name('student.filter');
// Route::resource('student', StudentController::class);

//ROUTE FOR COUNSELOR
Route::get('counselor', [CounselorController::class, 'index'])->name('counselor.index');
Route::post('counselor/filter', [CounselorController::class, 'filter'])->name('counselor.filter');
Route::post('counselor/store', [CounselorController::class, 'store'])->name('counselor.store');
Route::put('counselor/update', [CounselorController::class, 'update'])->name('counselor.update');
Route::delete('counselor/{id}', [CounselorController::class, 'delete'])->name('counselor.delete');

//ROUTE FOR APPOINTMENT
Route::get('appointment', [AppointmentController::class, 'index'])->name('appointment.index');
Route::post('appointment/filter', [AppointmentController::class, 'filter'])->name('appointment.filter');
