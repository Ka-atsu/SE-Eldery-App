<?php

namespace App\Http\Controllers;

use Twilio\Rest\Client;
use Illuminate\Http\Request;

class SmsController extends Controller
{
    public function sendSms(Request $request)
    {
        // Validate the incoming JSON data
        $validated = $request->validate([
            'emergency_contact' => ['required', 'string', 'regex:/^\+63 \d{3} \d{3} \d{4}$/'],  // Validate the phone number format
            'message' => 'required|string', // Validate the message
        ]);

        // Get the emergency contact number and message from the request
        $emergencyContact = $validated['emergency_contact'];
        $message = $validated['message'];  // Use the message sent from frontend

        // Get Twilio credentials from the .env file
        $sid = env('TWILIO_SID');
        $token = env('TWILIO_AUTH_TOKEN');
        $from = env('TWILIO_PHONE_NUMBER');

        // Initialize the Twilio client
        $client = new Client($sid, $token);

        try {
            // Send the SMS
            $client->messages->create(
                $emergencyContact, // The phone number to send to
                [
                    'from' => $from,  // Your Twilio phone number
                    'body' => $message // The body of the message
                ]
            );

            return response()->json(['status' => 'success', 'message' => 'SMS sent successfully!']);
        } catch (\Exception $e) {
            // If there's an error, return a failure response
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}