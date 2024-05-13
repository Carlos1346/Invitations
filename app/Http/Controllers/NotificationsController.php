<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Notifications\FriendRequestNotification;

class NotificationsController extends Controller
{
    public function indexNotifications()
    {
        $user = auth()->user();
        $notifications = DB::table('notifications')
            ->where('notifiable_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get(); // Ejecutar la consulta y obtener los resultados

        return response()->json($notifications);
    }
}