<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\EventAttendance;

class EventAttendanceController extends Controller
{
    
     //Muestra una lista de todas las asistencias a eventos.    
    public function index()
    {
        $eventAttendances = DB::table('event_attendances')->get();
        return response()->json($eventAttendances);
    }
   
     //Muestra los detalles de una asistencia de evento específica.    
    public function show($id)
    {
        $eventAttendance = DB::table('event_attendances')->where('id', $id)->first();
        return response()->json($eventAttendance);
    }
   
     // Almacena una nueva asistencia a un evento.
    public function store(Request $request)
    {
        $userId = auth()->id();

        DB::table('event_attendances')->insert([
            'user_id' => $userId,
            'event_id' => $request->event_id,
            'asistira' => $request->asistira,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Event attendance created successfully'], 201);
    }

     //Actualiza una asistencia de evento existente.    
    public function update(Request $request, $id)
    {
        $userId = auth()->id();

        DB::table('event_attendances')
            ->where('id', $id)
            ->where('user_id', $userId)
            ->update([
                'event_id' => $request->event_id,
                'asistira' => $request->asistira,
                'updated_at' => now()
            ]);

        return response()->json(['message' => 'Event attendance updated successfully'], 200);
    }

 
     //Elimina una asistencia de evento existente.     
    public function destroy($event_id)
    {
        $userId = auth()->id();

        DB::table('event_attendances')
            ->where('event_id', $event_id)
            ->where('user_id', $userId)
            ->delete();

        return response()->json(['message' => 'Event attendance deleted successfully'], 200);
    }

   
     //Marca la asistencia de un usuario a un evento.    
    public function markAttendance(Request $request)
    {
        $userId = auth()->id();

        DB::table('event_attendances')->insert([
            'user_id' => $userId,
            'event_id' => $request->event_id,
            'asistira' => true, // Marcamos la asistencia como true
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Attendance marked successfully'], 201);
    }

    /**
     * Lista todas las asistencias de evento para un evento específico.
     *
     * @param  int  $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function listEventAttendances($eventId)
    {
        $eventAttendances = DB::table('event_attendances')->where('event_id', $eventId)->get();
        return response()->json($eventAttendances);
    }

    /**
     * Lista todos los eventos a los que el usuario autenticado asistirá.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listUserEvents()
    {
        $userId = auth()->id();

        $userEvents = DB::table('event_attendances')
            ->join('events', 'event_attendances.event_id', '=', 'events.id')
            ->where('event_attendances.user_id', $userId)
            ->select('events.*')
            ->distinct()
            ->get();

        return response()->json($userEvents);
    }

    /**
     * Obtiene estadísticas de asistencia a eventos.
     *
     * @return \Illuminate\Http\JsonResponse
     */
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
