<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Reminder;
use Illuminate\Http\Request;
use Tests\CreatesApplication;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\RemindersController;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RemindersUnitTest extends TestCase
{
    use DatabaseMigrations, CreatesApplication;
    protected $controller;
    protected $email = 'test@example.com';
    protected $password = 'password';

    public function setUp(): void
    {
        parent::setUp();
        $this->createApplication();
        Artisan::call('migrate:fresh');
        User::factory()->create([
            'email' => $this->email,
            'password' => Hash::make($this->password),
        ]);
        $this->controller = new RemindersController();
    }
    
    public function test_can_create_reminders(): void
    {
        $user = Auth::loginUsingId(1);
        $data = [
            'title' => 'Meeting with Bob',
            'description' => 'Discuss about new project related to new system',
            'remind_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'event_at' => Carbon::now()->addDays(2)->format('Y-m-d H:i:s'),
        ];
        $mockedRequest = new Request($data);
        $mockedRequest->setUserResolver(function() use ($user) {
            return $user;
        });
        $result = $this->controller->create($mockedRequest);

        $this->assertTrue($result->original["message"] === "Reminder created successfully");
        $this->assertTrue($result->original["data"]["title"] === $data["title"]);
        $this->assertTrue($result->original["data"]["description"] === $data["description"]);
        $this->assertTrue($result->original["data"]["remind_at"] === strtotime($data["remind_at"]));
        $this->assertTrue($result->original["data"]["event_at"] === strtotime($data["event_at"]));
    }

    public function test_can_update_reminder(): void
    {
        $reminder = Reminder::factory()->create();
        $data = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'remind_at' => now()->addDay(),
            'event_at' => now()->addWeek(),
        ];
        $mockedRequest = new Request($data);
        $result = $this->controller->update($mockedRequest, $reminder->id);

        $this->assertTrue($result->original["message"] === "Reminder updated successfully");
        $this->assertTrue($result->original["data"]["title"] === $data["title"]);
        $this->assertTrue($result->original["data"]["description"] === $data["description"]);
        $this->assertTrue($result->original["data"]["remind_at"] === strtotime($data["remind_at"]));
        $this->assertTrue($result->original["data"]["event_at"] === strtotime($data["event_at"]));
    }

    public function test_can_view_remider(): void
    {
        $reminder = Reminder::factory()->create();
        $result = $this->controller->view($reminder->id);
        $this->assertTrue($result->original["ok"]);
        $this->assertTrue($result->original["data"]["title"] === $reminder->title);
        $this->assertTrue($result->original["data"]["description"] === $reminder->description);
        $this->assertTrue($result->original["data"]["remind_at"] === strtotime($reminder->remind_at->format('Y-m-d H:i:s')));
        $this->assertTrue($result->original["data"]["event_at"] === strtotime($reminder->event_at->format('Y-m-d H:i:s')));
    }

    public function test_can_delete_reminder(): void
    {
        $reminder = Reminder::factory()->create();
        $result = $this->controller->delete($reminder->id);
        $this->assertTrue($result->original["ok"]);
    }
}
