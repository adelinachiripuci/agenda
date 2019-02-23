
var modifica= "Modifica";
var sterge = "Sterge";
var persoane = [];
var state ="add";
var entry ;

function add() {
  var nume = document.querySelector("#nume").value;
  var telefon = document.querySelector("#telefon").value;
  var newPers = {
    nume,
    telefon,
    modifica,
    sterge
  };

  if (nume =="" && telefon == "") {
    event.preventDefault();
  } else if (state ==="add") {
    persoane.push(newPers);
    document.getElementById("tableContainer").classList.remove("hidden");
    draw();
    document.getElementById("myForm").reset();
  } else if ( state ==="edit") {
    persoane.splice(entry,1,newPers);
    draw();
    state ="add";
    document.getElementById("myForm").reset();
  }
};

function draw() {
  var str = ``;
  for (var i = 0;i<persoane.length; i++){
    str += `
    <tr>
      <td>${persoane[i].nume}</td>
      <td>${persoane[i].telefon}</td>
      <td class="underline" onclick="edit(${i});">${modifica}</td>
      <td class="underline" onclick="deleteRow(${i})">${sterge}</td>
    </tr>
    `
  }
  return document.querySelector("table>tbody").innerHTML = str;
};

function deleteRow(i) {
  persoane.splice(i, 1);
  draw();
  document.getElementById("myForm").reset();
  state = "add";
  if (persoane.length === 0) {
    document.getElementById("tableContainer").classList.add("hidden");
  }
};

function edit(i) {
  var newName = document.querySelector("#nume");
  var newPhone = document.querySelector("#telefon");
  newName.value = persoane[i].nume;
  newPhone.value = persoane[i].telefon;
  state ="edit";
  entry = i;
};

function enter(event) {
  if (event.keyCode === 13) {
    add();
  }
};
