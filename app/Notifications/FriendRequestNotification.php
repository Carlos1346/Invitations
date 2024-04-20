<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FriendRequestNotification extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'sender_id' => auth()->id(), // El ID del remitente de la solicitud de amistad
            'sender_name' => auth()->user()->name,
            'message' => 'Te ha enviado una solicitud de amistad.',
        ];
    }
}