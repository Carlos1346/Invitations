<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\EventAttendance;

class EventAttendanceController extends Controller
{
    public function index()
    {
        $eventAttendances = DB::table('event_attendances')->get();
        return response()->json($eventAttendances);
    }

    public function show($id)
    {
        $eventAttendance = DB::table('event_attendances')->where('id', $id)->first();
        return response()->json($eventAttendance);
    }

    public function store(Request $request)
    {
        DB::table('event_attendances')->insert([
            'user_id' => $request->user_id,
            'event_id' => $request->event_id,
            'asistira' => $request->asistira,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Event attendance created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        DB::table('event_attendances')
            ->where('id', $id)
            ->update([
                'user_id' => $request->user_id,
                'event_id' => $request->event_id,
                'asistira' => $request->asistira,
                'updated_at' => now()
            ]);

        return response()->json(['message' => 'Event attendance updated successfully'], 200);
    }

    public function destroy($id)
    {
        DB::table('event_attendances')->where('id', $id)->delete();
        return response()->json(['message' => 'Event attendance deleted successfully'], 200);
    }


    public function markAttendance(Request $request)
    {
        DB::table('event_attendances')->insert([
            'user_id' => $request->user_id,
            'event_id' => $request->event_id,
            'asistira' => true, // Marcamos la asistencia como true
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Attendance marked successfully'], 201);
    }

    public function listEventAttendances($eventId)
    {
        $eventAttendances = DB::table('event_attendances')->where('event_id', $eventId)->get();
        return response()->json($eventAttendances);
    }

    public function listUserEvents($userId)
    {
        $userEvents = DB::table('event_attendances')
            ->join('events', 'event_attendances.event_id', '=', 'events.id')
            ->where('event_attendances.user_id', $userId)
            ->select('events.*')
            ->distinct()
            ->get();
        return response()->json($userEvents);
    }

    public function attendanceStatistics()
    {
        $totalAttendances = DB::table('event_attendances')->count();
        $attendancesPerEvent = DB::table('event_attendances')
            ->select('event_id', DB::raw('count(*) as total_attendances'))
            ->groupBy('event_id')
            ->get();

        return response()->json([
            'total_attendances' => $totalAttendances,
            'attendances_per_event' => $attendancesPerEvent
        ]);
    }
}