{/* 
    include ('db.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $score = $data['score'];
        $percent = $data['percent'];
        $time = $data['time'];
        $finishTimestamp = $data['finishTimestamp'];
        $passed = $data['passed'];
        $passingPercent = $data['passingPercent'];
        $passingScore = $data['passingScore'];
        $questions = $data['questions'];

        // Guardar la información del quiz en la base de datos
        $stmt = $conn->prepare("INSERT INTO quiz_results (score, percent, time, finishTimestamp, passed, passingPercent, passingScore) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssii", $score, $percent, $time, $finishTimestamp, $passed, $passingPercent, $passingScore);

        if ($stmt->execute()) {
            $quizResultId = $stmt->insert_id;

            // Guardar las preguntas
            $stmtQuestion = $conn->prepare("INSERT INTO quiz_questions (quizResultId, type, direction, status, maxPoints, awardedPoints) VALUES (?, ?, ?, ?, ?, ?)");
            foreach ($questions as $question) {
                $stmtQuestion->bind_param("issssi", $quizResultId, $question['type'], $question['direction'], $question['status'], $question['maxPoints'], $question['awardedPoints']);
                $stmtQuestion->execute();
            }

            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }

        $stmt->close();
        $stmtQuestion->close();
        $conn->close();
    }

*/}
