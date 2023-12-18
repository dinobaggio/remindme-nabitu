<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use App\Jobs\MyRabbitMQJob;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Jobs\EmailReminderJob;
use App\Mail\RemindNotifEmail;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RemindersController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user(); // Anda mungkin perlu menyesuaikan ini sesuai dengan model pengguna yang Anda gunakan

        $limit = $request->input('limit', 10);

        $reminders = Reminder::orderBy('remind_at', 'asc')
            ->take($limit)
            ->get();

        return response()->json([
            'ok' => true,
            'data' => [
                'reminders' => $reminders,
                'limit' => $limit,
            ]
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'remind_at' => 'required|date',
            'event_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'err' => 'ERR_BAD_REQUEST',
                'msg' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $reminder = Reminder::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'remind_at' => $request->input('remind_at'),
            'event_at' => $request->input('event_at'),
        ]);

        dispatch(
            new EmailReminderJob(
                $title = $reminder->title,
                $description = $reminder->description,
                $mailTo = $request->user()->email
            )
        )->delay(Carbon::createFromFormat('Y-m-d H:i:s', $reminder->remind_at));

        return response()->json([
            'message' => 'Reminder created successfully', 
            'data' => [
                'title' => $reminder->title,
                'description' => $reminder->description,
                'remind_at' => strtotime($reminder->remind_at),
                'event_at' => strtotime($reminder->event_at),
            ]
        ], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'remind_at' => 'required|date',
            'event_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'err' => 'ERR_BAD_REQUEST',
                'msg' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $reminder = Reminder::find($id);

        if (!$reminder) {
            return response()->json([
                "ok" => false,
                "err" => "ERR_NOT_FOUND",
                "msg" => "resource is not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $reminder->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'remind_at' => $request->input('remind_at'),
            'event_at' => $request->input('event_at'),
        ]);

        return response()->json([
            'message' => 'Reminder updated successfully', 
            'data' => [
                'title' => $reminder->title,
                'description' => $reminder->description,
                'remind_at' => strtotime($reminder->remind_at),
                'event_at' => strtotime($reminder->event_at),
            ]
        ]);
    }

    public function view($id)
    {
        $reminder = Reminder::find($id);

        if (!$reminder) {
            return response()->json([
                "ok" => false,
                "err" => "ERR_NOT_FOUND",
                "msg" => "resource is not found"
            ], Response::HTTP_NOT_FOUND);
        }

        // Mengubah format tanggal menggunakan strtotime
        $formattedRemindAt = strtotime($reminder->remind_at);
        $formattedEventAt = strtotime($reminder->event_at);

        return response()->json([
            'ok' => true,
            'data' => [
                'id' => $reminder->id,
                'title' => $reminder->title,
                'description' => $reminder->description,
                'remind_at' => $formattedRemindAt,
                'event_at' => $formattedEventAt,
            ],
        ]);
    }

    public function delete($id)
    {
        $reminder = Reminder::find($id);

        if (!$reminder) {
            return response()->json([
                "ok" => false,
                "err" => "ERR_NOT_FOUND",
                "msg" => "resource is not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $reminder->delete();

        return response()->json(['ok' => true]);
    }

    public function sendEmailRemindNotif() {
        $mailTo = 'dbaggio111@gmail.com';
        Mail::to($mailTo)->send('emails.reminds');
    }
}
