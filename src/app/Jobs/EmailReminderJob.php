<?php

namespace App\Jobs;

use App\Models\Reminder;
use Illuminate\Bus\Queueable;
use App\Mail\RemindNotifEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class EmailReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mailTo = '';
    protected $title;
    protected $description;
    protected $remindId;
    protected $remindAt;

    /**
     * Create a new job instance.
     */
    public function __construct($title = '', $description = '', $remindId = '', $remindAt = '', $mailTo = '')
    {
        $this->title = $title;
        $this->description = $description;
        $this->remindId = $remindId;
        $this->remindAt = $remindAt;
        $this->mailTo = $mailTo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // check jika remind at reminder berubah maka jangan eksekusi
        $currReminder = Reminder::find($this->remindId);
        if (isset($currReminder->remind_at) && $currReminder->remind_at === $this->remindAt) {
            $content = new RemindNotifEmail(
                $title = $this->title,
                $description = $this->description
            );
            Mail::to($this->mailTo)->send($content);
        }
    }
}
