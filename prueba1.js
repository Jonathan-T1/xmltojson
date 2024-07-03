/*document.getElementById("uploadinfo").addEventListener("click", uploadInfo);

function  uploadInfo() {*/
fetch("./result/result1.xml").then(function(reponse) {
    return reponse.text()
}).then(function(xmlString){
    const xml = new DOMParser().parseFromString(xmlString,"text/xml")

    const multichois = xml.querySelectorAll("multipleResponseQuestion");

    multichois.forEach(question => {
        // Imprime la dirección de la pregunta
        const direction = question.querySelector("direction").textContent;
        console.log("Pregunta: ", direction);

        // Obtén todas las respuestas para la pregunta actual
        const answers = question.querySelectorAll("answers > answer");

        // Recorre cada respuesta
        answers.forEach(answer => {
            // Verifica si la respuesta es correcta
            const correct = answer.getAttribute("correct") === "true";
            const answerText = answer.querySelector("text").textContent;

            if (correct) {
                console.log(`Correcta: ${answerText} `);
            } else {
                console.log(`Incorrecta: ${answerText} `);
            }
        });

        console.log("----------------------------------------------------------------");
    });

    const trueFalseQuestion = xml.querySelectorAll("trueFalseQuestion");
    trueFalseQuestion.forEach(question =>{
        const direction = question.querySelector("direction text").textContent;
        console.log("Pregunta :",direction)

        // Obtén el índice de la respuesta correcta y la respuesta del usuario
        const correctAnswerIndex = question.querySelector("answers").getAttribute("correctAnswerIndex");
        const userAnswerIndex = question.querySelector("answers").getAttribute("userAnswerIndex");

        // Obtén todas las respuestas
        const answers = question.querySelectorAll("answers answer");

        // Verifica si la respuesta del usuario es correcta
        const userAnswerText = answers[userAnswerIndex].querySelector("text").textContent;
        const isCorrect = correctAnswerIndex === userAnswerIndex;

        if (isCorrect) {
            console.log(`Tu respuesta fue: ${userAnswerText} 🎉 esto es correcto 🎉`);
        } else {
            console.log(`Tu respuesta fue: ${userAnswerText} 😱😱la respuesta correcta es verdadero 😱😱`);
        }

        console.log("----------------------------------------------------------------");
    })
    const quizReport = xml.querySelector("quizReport");
    

});
/*}*/
