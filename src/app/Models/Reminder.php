<?php

namespace App\Models;

use App\Jobs\EmailReminderJob;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reminder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'remind_at',
        'event_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public static function remindNotif($data, $userEmail = '') {
        $delay = Carbon::createFromFormat('Y-m-d H:i:s', $data->remind_at, 'Asia/Jakarta');
        // $delay->setTimezone('UTC');
        dispatch(
            new EmailReminderJob(
                $title = $data->title,
                $description = $data->description,
                $remindId = $data->id,
                $remindAt = $data->remind_at,
                $mailTo = $userEmail,
            )
        )->delay($delay);
    }
}
