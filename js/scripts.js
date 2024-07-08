document.getElementById("uploadinfo").addEventListener("click", uploadInfo);

function uploadInfo() {
    const filePath = "./result/result2.xml";  // Asegúrate de que esta ruta sea correcta

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlString => {
            const xml = new DOMParser().parseFromString(xmlString, "text/xml");

            const summary = xml.querySelector("summary");
            const group = xml.querySelector("group");

            if (summary && group) {
                const score = summary.getAttribute("score");
                const percent = summary.getAttribute("percent");
                const time = summary.getAttribute("time");
                const finishTimestamp = summary.getAttribute("finishTimestamp");
                const passed = summary.getAttribute("passed");
                const passingPercent = group.getAttribute("passingPercent");
                const passingScore = group.getAttribute("passingScore");

                // Mostrar los datos en la interfaz
                document.getElementById("student-score").textContent = `${percent}% (${score} Puntos Obtenidos)`;
                document.getElementById("finish-timestamp").textContent = finishTimestamp;
                document.getElementById("time-used").textContent = time;
                document.getElementById("result-status").textContent = passed === "true" ? 'Aprobado' : 'Reprobado';
                document.getElementById("required-score").textContent = `${passingPercent}% (${passingScore} Puntos Requeridos)`;

                // Limpiar y mostrar preguntas en la tabla
                const tbody = document.getElementById("infoxml");
                tbody.innerHTML = '';

                const questionTypes = [
                    "multipleChoiceQuestion",
                    "trueFalseQuestion",
                    "matchingQuestion",
                    "multipleResponseQuestion"
                ];

                questionTypes.forEach(type => {
                    const questionsOfType = xml.querySelectorAll(type);
                    questionsOfType.forEach((question, index) => {
                        const direction = question.querySelector("direction text").textContent;
                        const status = question.getAttribute("status");
                        const maxPoints = question.getAttribute("maxPoints");
                        const awardedPoints = question.getAttribute("awardedPoints");
                        const resultIcon = status === "correct" ? '<i class="bi bi-bookmark-check-fill" style="color: green;"></i>' : '<i class="bi bi-bookmark-x-fill" style="color: red;"></i>';

                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${direction}</td>
                            <td>${awardedPoints}</td>
                            <td>${maxPoints}</td>
                            <td>${resultIcon}</td>
                        `;
                        tbody.appendChild(row);
                    });
                });

                // Después de procesar los datos, guardar en la base de datos
                const data = {
                    score: score,
                    percent: percent,
                    time: time,
                    finishTimestamp: finishTimestamp,
                    passed: passed,
                    passingPercent: passingPercent,
                    passingScore: passingScore
                };

                fetch("./save-quiz-results.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.text())
                .then(result => {
                    console.log("Respuesta del servidor:", result);
                    try {
                        const jsonResult = JSON.parse(result);
                        console.log("Datos guardados:", jsonResult);
                    } catch (e) {
                        console.error("Error al parsear JSON:", e);
                    }
                })
                .catch(error => {
                    console.error("Error al guardar los datos:", error);
                });
            } else {
                console.error("No se encontraron los elementos <summary> o <group> en el documento XML.");
            }
        })
        .catch(error => {
            console.error("Error al cargar el XML:", error);
        });
}
