var tabel = document.getElementById("tabel_lista_elevi");
var tabelNote = document.getElementById("tabel_lista_note");
var catalog = [];
var insertElev = document.getElementById("nume_elev");
var insertNota = document.getElementById("nota_elev");
var elevi = document.getElementById("Lista_elevi_warper");
var note = document.getElementById("Note_elev_wraper");
var btnAdaugaElev = document.getElementById("adaugaElev");
var btnAdaugaNota = document.getElementById("adaugaNota");
var noteElev = document.getElementById("elev_note");
var loc = 0;

document.addEventListener("click", behavior);
insertElev.addEventListener("keyup", apasaEnter);
insertNota.addEventListener("keyup", apasaEnter);

function behavior(e) {

    console.log(e.target.id);
    console.log(e.target.value);

    if (e.target.id == "inchide_wraper") {
        note.style.display = "none";
        elevi.style.width = "100%";
    }
    if (e.target.innerHTML == "Adauga elev") {
        if (insertElev.value != "") {
            tabel.deleteRow(1);
            catalog.push({
                nume: `${insertElev.value}`,
                medie: function () {
                    if (this.nota == undefined) {
                        return "-";
                    } else {
                        var s = 0;
                        for (var i = 0; i < this.nota.length; i++) {
                            s += parseFloat(this.nota[i]);
                        }
                        return s / this.nota.length;
                    }
                }
            });
            draw();
            insertElev.value = "";
        } else {
            alert("introduce un nume de elev");
        }
    }
    if (e.target.innerHTML == "Vezi Notele") {

        loc = e.target.id;

        if (catalog[loc].nota == undefined) {
            catalog[loc].nota = [];
        }
        console.log(e.target.id);
        console.log("nota are valoarea = ", insertNota.value);

        note.style.display = "block";
        elevi.style.width = "50%";
        var numeNote = catalog[e.target.id].nume;
        noteElev.innerHTML = `Lista note elev-----> ${numeNote}`

        deleteTable(tabelNote);
        drawNote(loc);

    }

    if (e.target.innerHTML == "Adauga nota") {
        if (insertNota.value != "") {

            catalog[loc].nota.push(parseFloat(insertNota.value));
            insertNota.value = "";
            drawNote(loc);
            draw();
        } else {
            alert("introduce o nota");
        }
    }

    if (e.target.id == "scm") {

        console.log("ai apasat pe sortare crescatoare medie");
        sortCresc("medie");
        draw();

    }
    if (e.target.id == "sdm") {

        console.log("ai apasat pe sortare decrescatoare medie");
        sortDescresc("medie");
        draw();

    }
    if (e.target.id == "scn") {

        console.log("ai apasat pe sortare crescatoare note");
        sortCresc("nota");
        drawNote(loc);
    }
    if (e.target.id == "sdn") {

        console.log("ai apasat pe sortare descrescatoare note");
        sortDescresc("nota");
        drawNote(loc);
    }

    console.log("catalogul are: ", catalog);
}

function draw() {
    var count = 0;
    tabel.innerHTML = `<th>
    <tr>
        <td><b> Nume</b></td>
        <td><b> Medie Note</b></td>
    </tr>
</th>`
    for (var i = 0; i < catalog.length; i++) {
        tabel.innerHTML += `<tr>
        <td id="nume">${catalog[i].nume}</td>
        <td id="medie">${catalog[i].medie()}</td>
        <td> <button id="${count}">Vezi Notele</button></td>
    </tr>`
        count++;
    }
}

function apasaEnter(e) {
    if (e.target.id == "nume_elev" && e.keyCode === 13) {
        btnAdaugaElev.click();
    }
    if (e.target.id == "nota_elev" && e.keyCode === 13) {
        btnAdaugaNota.click();
    }
}

function drawNote(arg) {
    tabelNote.innerHTML = `<th>
    <tr>
        <td><b>Note</b></td>
    </tr>
</th>`
    for (var i = 0; i < catalog[arg].nota.length; i++) {

        tabelNote.innerHTML += `<tr>
        <td>${catalog[arg].nota[i]}</td>
           </tr>`
    }
}

function deleteTable(arg) {
    for (var i = 0; i < arg.rows.length; i++) {
        arg.deleteRow(0);
    }
}

function sortCresc(arg) {
    var temp = {};
    if (arg == "medie") {
        for (var i = 0; i < catalog.length - 1; i++) {
            for (var j = i + 1; j < catalog.length; j++) {
                if (catalog[i][arg]() > catalog[j][arg]()) {
                    temp = catalog[i];
                    catalog[i] = catalog[j];
                    catalog[j] = temp;
                }
            }
        }
    } else if (arg == "nota") {
        for (var i = 0; i < catalog[loc].nota.length - 1; i++) {
            for (var j = i + 1; j < catalog[loc].nota.length; j++) {
                if (catalog[loc][arg][i] > catalog[loc][arg][j]) {
                    temp = catalog[loc][arg][i];
                    catalog[loc][arg][i] = catalog[loc][arg][j];
                    catalog[loc][arg][j] = temp;
                }
            }
        }
    }
}

function sortDescresc(arg) {
    var temp = {};
    if (arg == "medie") {
        for (var i = 0; i < catalog.length - 1; i++) {
            for (var j = i + 1; j < catalog.length; j++) {
                if (catalog[i][arg]() < catalog[j][arg]()) {
                    temp = catalog[i];
                    catalog[i] = catalog[j];
                    catalog[j] = temp;
                }
            }
        }
    } else if (arg == "nota") {
        for (var i = 0; i < catalog[loc].nota.length - 1; i++) {
            for (var j = i + 1; j < catalog[loc].nota.length; j++) {
                if (catalog[loc][arg][i] < catalog[loc][arg][j]) {
                    temp = catalog[loc][arg][i];
                    catalog[loc][arg][i] = catalog[loc][arg][j];
                    catalog[loc][arg][j] = temp;
                }
            }
        }
    }
}