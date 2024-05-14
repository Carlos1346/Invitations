<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Notifications\FriendRequestNotification;

class FriendController extends Controller
{
    // Método para enviar una solicitud de amistad
    public function sendFriendRequest(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            //'user_id1' => 'required|exists:users,id',
            'user_id2' => 'required|exists:users,id',
        ]);

        // Crear una nueva solicitud de amistad
        DB::table('friends')->insert([
            'user_id1' => auth()->id(),
            'user_id2' => $request->user_id2,
            'accepted' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Obtener el destinatario de la solicitud de amistad
        $recipient = User::find($request->user_id2);

        // Verificar que se haya encontrado el destinatario
        if ($recipient) {
            // Enviar la notificación al destinatario pasando el usuario remitente
            $recipient->notify(new FriendRequestNotification());
        } else {
            // Manejar el caso en que no se haya encontrado el destinatario
            return response()->json(['error' => 'Recipient not found'], 404);
        }

        return response()->json(['message' => 'Friend request sent'], 201);
    }
    // Método para aceptar una solicitud de amistad
    public function acceptFriendRequest(Request $request, $id)
    {
        // Buscar la solicitud de amistad por su ID
        $friendRequest = DB::table('friends')->find($id);

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        // Actualizar la solicitud como aceptada
        DB::table('friends')->where('id', $id)->update(['accepted' => true]);

        return response()->json(['message' => 'Friend request accepted']);
    }

    // Método para rechazar una solicitud de amistad
    public function rejectFriendRequest(Request $request, $id)
    {
        // Buscar la solicitud de amistad por su ID
        $friendRequest = DB::table('friends')->find($id);

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        // Eliminar la solicitud de amistad
        DB::table('friends')->where('id', $id)->delete();

        return response()->json(['message' => 'Friend request rejected']);
    }

    // Método para cancelar una solicitud de amistad enviada
    public function cancelFriendRequest(Request $request, $id)
    {
        // Buscar la solicitud de amistad por su ID
        $friendRequest = DB::table('friends')->find($id);

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        // Eliminar la solicitud de amistad
        DB::table('friends')->where('id', $id)->delete();

        return response()->json(['message' => 'Friend request cancelled']);
    }

    // Método para eliminar una amistad existente
    public function unfriend(Request $request, $id)
    {
        // Buscar la amistad por su ID
        $friendship = DB::table('friends')->find($id);

        if (!$friendship) {
            return response()->json(['message' => 'Friendship not found'], 404);
        }

        // Eliminar la amistad
        DB::table('friends')->where('id', $id)->delete();

        return response()->json(['message' => 'Friendship removed']);
    }


    public function getFriends()
    {
        $userId = auth()->id();

        // Obtener todas las solicitudes de amistad aceptadas donde el usuario autenticado es el remitente
        $sentRequests = DB::table('friends')
            ->where('user_id1', $userId)
            ->where('accepted', true)
            ->pluck('user_id2')
            ->toArray();

        // Obtener todas las solicitudes de amistad aceptadas donde el usuario autenticado es el destinatario
        $receivedRequests = DB::table('friends')
            ->where('user_id2', $userId)
            ->where('accepted', true)
            ->pluck('user_id1')
            ->toArray();

        // Combinar las dos listas para obtener todos los amigos
        $friendIds = array_merge($sentRequests, $receivedRequests);

        // Obtener los detalles de los usuarios amigos
        $friends = User::whereIn('id', $friendIds)->get();

        return response()->json(['friends' => $friends]);
    }

    public function getRequest()
    {
        $userId = auth()->id();

       

        // Obtener todas las solicitudes de amistad aceptadas donde el usuario autenticado es el destinatario
        $receivedRequests = DB::table('friends')
            ->where('user_id2', $userId)
            ->where('accepted', false)
            ->pluck('user_id1')
            ->toArray();

        // Combinar las dos listas para obtener todos los amigos
        $friendIds = $receivedRequests;

        // Obtener los detalles de los usuarios amigos
        $friends = User::whereIn('id', $friendIds)->get();

        return response()->json(['friends' => $friends]);
    }

}
