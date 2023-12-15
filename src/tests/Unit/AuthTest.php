<?php

namespace Tests\Unit;

use App\Models\User;
use App\Enums\TokenAbility;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tests\CreatesApplication;
use PHPUnit\Framework\TestCase;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Requests\RefreshTokenRequest;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AuthTest extends TestCase
{
    use DatabaseMigrations, CreatesApplication;
    protected $email = 'test@example.com';
    protected $password = 'password';
    protected $controller;

    public function setUp(): void
    {
        parent::setUp();
        $this->createApplication();
        Artisan::call('migrate:fresh');
        User::factory()->create([
            'email' => $this->email,
            'password' => Hash::make($this->password),
        ]);
        $this->controller = new AuthController();
    }

    
    public function test_func_login(): void
    {
        $mockedRequest = new LoginRequest([
            'email' => $this->email,
            'password' => $this->password,
        ]);

        $result = $this->controller->login($mockedRequest);

        $this->assertEquals(
            $result->original["data"]["user"]["email"],
            $this->email
        );
        $this->assertEquals(
            Response::HTTP_OK,
            $result->getStatusCode()
        );
        $this->assertTrue($result->original["ok"]);
        $this->assertTrue(!!$result->original["data"]["user"]["email"]);
        $this->assertTrue(!!$result->original["data"]["user"]["id"]);
        $this->assertTrue(!!$result->original["data"]["user"]["name"]);
    }

    public function test_func_refreshToken()
    {
        $user = Auth::loginUsingId(1);
        $mockedRequest = new RefreshTokenRequest();
        $refreshToken = $user->createToken('refresh_token', [TokenAbility::ISSUE_ACCESS_TOKEN->value])->plainTextToken;
        $mockedRequest->setUserResolver(function() use ($user) {
            return $user;
        });
        $mockedRequest->headers->add([
            'Authorization' => 'Bearer '. $refreshToken
        ]);
        $result = $this->controller->refreshAccessToken($mockedRequest);
        $this->assertTrue(!!$result->original["data"]["access_token"]);
    }
}
