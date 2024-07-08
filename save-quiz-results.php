<?php
include ('db.php');

// Recibir datos del cuerpo de la solicitud POST
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $score = $conn->real_escape_string($data['score']);
    $percent = $conn->real_escape_string($data['percent']);
    $time = $conn->real_escape_string($data['time']);
    $finishTimestamp = $conn->real_escape_string($data['finishTimestamp']);
    $passed = $conn->real_escape_string($data['passed']);
    $passingPercent = $conn->real_escape_string($data['passingPercent']);
    $passingScore = $conn->real_escape_string($data['passingScore']);

    // Inserción de datos en la base de datos
    $sql = "INSERT INTO quiz_results (score, percent, time, finishTimestamp, passed, passingPercent, passingScore)
            VALUES ('$score', '$percent', '$time', '$finishTimestamp', '$passed', '$passingPercent', '$passingScore')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Data saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No data received"]);
}

// Cerrar conexión
$conn->close();
?>
