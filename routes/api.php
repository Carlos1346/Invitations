<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\EventAttendanceController;

//Rutas RegisterController
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login'])->name('login');

//Rutas UserController
Route::get('users_index', [UserController::class, 'index']);
Route::post('users_create', [UserController::class, 'create']);
Route::get('users_show/{id}', [UserController::class, 'show']);
Route::put('users_update/{id}', [UserController::class, 'update']);
Route::delete('users_destroy/{id}', [UserController::class, 'destroy']);
Route::get('users_search', [UserController::class, 'search']);

//Rutas protegidas con autenticacion de usuario
Route::middleware('auth:api')->group(function () {
    //Rutas RegisterController
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::get('aut', [RegisterController::class, 'Autenticado']);

    //Rutas EventController
    Route::get('events_index', [EventController::class, 'index']);
    Route::post('events_create', [EventController::class, 'create']);
    Route::get('events_show/{id}', [EventController::class, 'show']);
    Route::put('events_update/{id}', [EventController::class, 'update']);
    Route::delete('events_destroy/{id}', [EventController::class, 'destroy']);
    Route::get('events_search', [EventController::class, 'search']);

    //Rutas FriendController
    Route::post('friend_requests', [FriendController::class, 'sendFriendRequest']);
    Route::put('friend_requests/accept/{id}', [FriendController::class, 'acceptFriendRequest']);
    Route::delete('friend_requests/reject/{id}', [FriendController::class, 'rejectFriendRequest']);
    Route::delete('friend_requests/cancel/{id}', [FriendController::class, 'cancelFriendRequest']);
    Route::delete('friendships/remove/{id}', [FriendController::class, 'unfriend']);
    Route::get('friendships/getfriends', [FriendController::class, 'getFriends']);


    //Rutas UserController
    Route::delete('users_destroy', [UserController::class, 'destroy']);

    //Rutas EventAttedaceController
    Route::get('event_attendances_index', [EventAttendanceController::class, 'index']);
    Route::get('event_attendances_show/{id}', [EventAttendanceController::class, 'show']);
    Route::post('event_attendances_store', [EventAttendanceController::class, 'store']);
    Route::put('event_attendances_update/{id}', [EventAttendanceController::class, 'update']);
    Route::delete('event_attendances_destroy/{id}', [EventAttendanceController::class, 'destroy']);

    Route::post('mark_attendance', [EventAttendanceController::class, 'markAttendance']);
    Route::get('list_event_attendances/{eventId}', [EventAttendanceController::class, 'listEventAttendances']);
    Route::get('list_user_events', [EventAttendanceController::class, 'listUserEvents']);
    Route::get('attendance_statistics', [EventAttendanceController::class, 'attendanceStatistics']);




});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
