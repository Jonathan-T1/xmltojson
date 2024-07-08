document.getElementById("uploadinfo").addEventListener("click", uploadInfo);

function uploadInfo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            upXML(this);
        }
    };
    xhr.open("GET", "./result/result1.xml", true);
    xhr.send();
}

function upXML(xml) {
    var docXML = xml.responseXML;
    var tabla = "<tr><td>multi</td><td>info</td></tr>";
    var info = docXML.getElementsByTagName("multipleResponseQuestion");
    for (var i = 0; i < info.length; i++){
        tabla += "<tr><td>";
        tabla += info[i].getElementsByTagName("text")[0].textContent;
        tabla += "</td></tr>";
    }

    document.getElementById("demo").innerHTML = tabla;
}
