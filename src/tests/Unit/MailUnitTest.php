<?php

namespace Tests\Unit;

use Tests\CreatesApplication;
use App\Mail\RemindNotifEmail;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Mail;

class MailUnitTest extends TestCase
{
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();
        $this->createApplication();
        // Artisan::call('migrate:fresh');
    }

    public function test_send_email(): void
    {
        $mailTo = 'dbaggio111@gmai.com';
        Mail::to($mailTo )->send(new RemindNotifEmail());
        $this->assertTrue(true);
    }
}
