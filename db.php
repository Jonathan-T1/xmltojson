<?php
ob_start();
$server = "localhost";
$user = "root";
$pass = "";
$db = "xmltojason";

// Create connection
$conn = new mysqli($server, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}
$acentos = $conn->query("SET NAMES 'utf8'");
?>
