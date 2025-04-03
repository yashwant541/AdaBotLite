<?php
$host = "localhost";
$user = "root"; // Replace with your MySQL username
$password = "password"; // Replace with your MySQL password
$dbname = "questionnaire_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
