<?php

namespace App\Http\Controllers\API\User;

use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Display a listing of the user's messages.
     */
    public function index()
    {
        $user = JWTAuth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $messages = Message::where('user_id', $user->id)
            ->select('id', 'msg_content', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($messages);
    }

    /**
     * Store a newly created message in storage.
     */
    public function store(Request $request)
    {
        $user = JWTAuth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $validated = Validator::make($request->all(), [
            'msg_content' => 'required|string|max:1000',
            'username' => 'required|string|exists:users,username',
        ]);

        if ($validated->fails()) {
            return response()->json(['message' => $validated->errors()->first()], 422);
        }

        $recipient = User::where('username', $request->username)->first();
        $cleanMessage = strip_tags($request->msg_content);

        $message = Message::create([
            'msg_content' => $cleanMessage,
            'user_id' => $recipient->id,
        ]);

        return response()->json(['message' => 'Message sent', 'data' => $message], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
