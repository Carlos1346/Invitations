<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Event;

class EventController extends Controller
{
    //Obtienes los registros de la tabla events
    public function index()
    {
        $events = DB::table("events")->get();
        return $events;
    }

    //Obtiene los eventos de los usuarios que creo el usuario autenticado
    public function indexUserEvents()
    {
        // Obtener el ID del usuario autenticado
        $userId = auth()->id();
        
        // Obtener los eventos creados por el usuario autenticado
        $events = Event::where('user_id_creator', $userId)->get();

        // Retornar los eventos
        return response()->json(['events' => $events], 200);
    }

    //Funcion para crear un evento
    public function create(Request $request)
    {
        DB::table('events')->insert([
            'event_name' => $request->event_name,
            'event_date' => $request->event_date,
            'event_address' => $request->event_address,
            'event_description' => $request->event_description,
            'event_rules' => $request->event_rules,
            'public_private' => $request->public_private,
            'user_id_creator' => auth()->id(),
        ]);
    }

    //Funcion para mostrar un evento en especifico
    public function show(string $id)
    {
        $event = DB::table('events')->where('id', $id)->first();
        return $event;
    }
    //Funcion para actualizar un evento
    public function update(Request $request, $id)
    {
        DB::table('events')
            ->where('id', $id)
            ->update([
                'event_name' => $request->event_name,
                'event_date' => $request->event_date,
                'event_address' => $request->event_address,
                'event_description' => $request->event_description,
                'event_rules' => $request->event_rules,
                'public_private' => $request->public_private,
                'user_id_creator' => auth()->id(),
            ]);
    }

    //Funcion para eliminar un evento
    public function destroy(string $id)
    {
        DB::table('events')->where('id', $id)->delete();
    }

    //Funcion para la barra de busqueda de eventos
    public function search(Request $request)
    {
        $termino = $request->input('termino');

        $events = DB::table('events')
            ->where('event_name', 'like', '%'.$termino.'%')
            ->get();

        if ($events->isEmpty()) {
            return response()->json(['mensaje' => 'No se encontraron usuarios que coincidan con el término de búsqueda proporcionado'], 404);
        }

        return response()->json($events);
    }
}


