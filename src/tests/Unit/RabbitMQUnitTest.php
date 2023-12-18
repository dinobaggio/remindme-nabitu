<?php

namespace Tests\Unit;

use App\Jobs\MyRabbitMQJob;
use Tests\CreatesApplication;
use App\Jobs\EmailReminderJob;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Queue;
use Illuminate\Console\Scheduling\Schedule;
use VladimirYuldashev\LaravelQueueRabbitMQ\Facades\RabbitMQ;

class RabbitMQUnitTest extends TestCase
{
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();
        $this->createApplication();
        // Artisan::call('migrate:fresh');
    }
    /**
     * A basic unit test example.
     */
    public function test_rabbitmq_connection(): void
    {
        EmailReminderJob::dispatch()->delay(Carbon::now()->addSeconds(20));
        $this->assertTrue(true);
    }
}
