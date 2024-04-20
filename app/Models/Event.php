<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Event extends Model
{
    use HasFactory;


    protected $fillable = [
        'event_name',
        'event_date',
        'event_address',
        'event_description',
        'event_rules',
        'public_private',
        'user_id_creator',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id_creator');
    }
}
