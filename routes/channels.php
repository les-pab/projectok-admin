<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('student.appointment.{userId}', function ($student, $userId) {
    // return $student->id === $userId;
    return true;
});

Broadcast::channel('counselor.appointment.{userId}', function ($counselor, $userId) {
    // return $counselor->id === $userId;
    return true;
});


Broadcast::channel('appointment', function () {
    // return $counselor->id === $userId;
    return true;
});

Broadcast::channel('student', function () {
    // return $counselor->id === $userId;
    return true;
});

Broadcast::channel('counselor', function () {
    // return $counselor->id === $userId;
    return true;
});