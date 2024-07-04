document.getElementById("uploadinfo").addEventListener("click", uploadInfo);

function uploadInfo() {
    /*aca esta la magia ya que con este fetch busca en este directoria el xml 
    para despues poder manejarlos las etiquetas que genera
    */
    fetch("./result/result1.xml").then(function(response) {
        return response.text();
    }).then(function(xmlString) {
    /*y con esta variable que creamos xml la convertimos legible con 
    el Domparser() parsea todo el xml y la hace manejable
    */
        const xml = new DOMParser().parseFromString(xmlString, "text/xml");
    
    //creamos constantes para buscar datos del xml,los buscamos por la estiqueta que tienen ejmplo:
        const summary = xml.querySelector("summary");
        const group = xml.querySelector("group");
        if (summary,group) {
            const score = summary.getAttribute("score");
            const percent = summary.getAttribute("percent");
            const time = summary.getAttribute("time");
            const finishTimestamp = summary.getAttribute("finishTimestamp");
            const passed = summary.getAttribute("passed");
            const passingPercent = group.getAttribute("passingPercent");
            const passingScore = group.getAttribute("passingScore");
        //aca inyectamos directamente en el documento los datos que queremos mostrar segun id
            document.getElementById("student-score").textContent = `${percent}% (${score} Puntos Obtenidos )`;
            document.getElementById("finish-timestamp").textContent = finishTimestamp;
            document.getElementById("time-used").textContent = time;
            document.getElementById("result-status").textContent = passed === "true" ? 
            ' Aprovado' : 
            ' Reprovado';
            document.getElementById("required-score").textContent = `${passingPercent}% (${passingScore} Puntos Requeridos )`;
        } else {
            console.error("No se encontró el elemento <summary> en el documento XML.");
        }

        const tbody = document.getElementById("infoxml");
        tbody.innerHTML = ''; // Limpiar cualquier contenido existente

        const multichoice = xml.querySelectorAll("multipleResponseQuestion");

        multichoice.forEach((question, index) => {
            const direction = question.querySelector("direction").textContent;
            const status = question.getAttribute("status");
            const maxPoints = question.getAttribute("maxPoints");
            const awardedPoints = question.getAttribute("awardedPoints");
            const resultIcon = status === "correct" ? 
                '<i class="bi bi-bookmark-check-fill" style="color: green;"></i>' : 
                '<i class="bi bi-bookmark-x-fill" style="color: red;"></i>';
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

        const trueFalseQuestion = xml.querySelectorAll("trueFalseQuestion");
        trueFalseQuestion.forEach((question, index) => {
            const direction = question.querySelector("direction text").textContent;
            const status = question.getAttribute("status");
            const maxPoints = question.getAttribute("maxPoints");
            const awardedPoints = question.getAttribute("awardedPoints");
            const resultIcon = status === "correct" ? 
                '<i class="bi bi-bookmark-check-fill" style="color: green;"></i>' : 
                '<i class="bi bi-bookmark-x-fill" style="color: red;"></i>';
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${multichoice.length + index + 1}</td>
                <td>${direction}</td>
                <td>${awardedPoints}</td>
                <td>${maxPoints}</td>
                <td>${resultIcon}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

