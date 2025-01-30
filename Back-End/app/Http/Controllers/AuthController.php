<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'emergency_contact' => 'required|string|max:15'  // Allow full phone number format
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'emergency_contact' => $request->emergency_contact
        ]);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    // Login User
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user_id' => $user->id
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'emergency_contact' => 'nullable|string|max:15',  // Optional emergency contact
        ]);
    
        // Check for validation errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Find the user by ID
        $user = User::find($id);
    
        // If the user is not found, return a 'User not found' error
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Update the user's profile
        $user->name = $request->name;
        if ($request->has('emergency_contact')) {
            $user->emergency_contact = $request->emergency_contact;
        }
    
        // Save the updated user data
        $user->save();
    
        // Return a success message
        return response()->json(['message' => 'Profile updated successfully!'], 200);
    }    
}