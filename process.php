<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get JSON data from frontend
$data = json_decode(file_get_contents('php://input'), true);

// Debug: Log received data
file_put_contents("log.txt", "Received Data: " . json_encode($data) . "\n", FILE_APPEND);

// Check if required fields exist
if (!isset($data['name']) || !isset($data['number']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
    exit;
}

// Sanitize input
$name = trim($data['name']);
$number = trim($data['number']);
$email = trim($data['email']);

// Google Form URL (use formResponse, NOT viewform)
$googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfPBsxIecENxdb5i9pPd3J9Yl0Kf2sLadgtcoA63GNw-3e9tw/formResponse";

// Map form fields to Google Form Entry IDs
$formData = [
    "entry.1047060156" => $name,
    "entry.2101188198" => $number,
    "entry.1462208696" => $email
];

// Convert data to URL format
$postFields = http_build_query($formData);

// Debug: Log data before sending
file_put_contents("log.txt", "Submitting: " . json_encode($formData) . "\n", FILE_APPEND);

// Use cURL to send the data
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $googleFormUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Debug: Log Google Form response
file_put_contents("log.txt", "Google Form Response Code: $httpCode\n", FILE_APPEND);

// Return success response to trigger the "Thank You" message
if ($httpCode == 200 || $httpCode == 302) {
    echo json_encode([
        "message" => "Success",
        "thank_you" => [
            "english" => "Thank you for submitting the form. We will reach out to you shortly.",
            "arabic" => "شكرًا لك على تقديم النموذج. سنتواصل معك قريبًا."
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to submit. Try again later."]);
}
?>
