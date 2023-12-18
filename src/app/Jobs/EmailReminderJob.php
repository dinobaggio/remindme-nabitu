<?php

namespace App\Jobs;

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
    protected $title = '';
    protected $description = '';
    protected $mailTo = '';

    /**
     * Create a new job instance.
     */
    public function __construct($title = '', $description = '', $mailTo = '')
    {
        $this->title = $title;
        $this->description = $description;
        $this->mailTo = $mailTo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $content = new RemindNotifEmail(
            $title = $this->title,
            $description = $this->description
        );
        Mail::to($this->mailTo)->send($content);
    }
}
