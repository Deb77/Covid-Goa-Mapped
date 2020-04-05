function closeOtherInfo() {
    if (InforObj.length > 0) {
        InforObj[0].set("marker", null);
        InforObj[0].close();
        InforObj.length = 0;
    }
}

function updateDate(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `/${id}`, true);
    xhr.send();
    var date= new Date();
    document.getElementById("last_open").innerHTML = `last open on ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}