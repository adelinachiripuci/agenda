var list = [];
var status;

function drawName() {
  var str = "";

  for(var i = 0; i < list.length; i++) {
    if (list[i].nrGrades === 0) {
      str += `
        <tr>
        <td>${list[i].name}</td>
        <td></td>
        <td><button class="buttons" onclick="showGrades(${i})">Vezi note</button></td>
        </tr>
      `
      document.querySelector("#content").classList.remove("hidden");
    } else if (list[i].nrGrades == 1) {
      str += `
        <tr>
        <td>${list[i].name}</td>
        <td>${list[i].grades}</td>
        <td><button class="buttons" onclick="showGrades(${i})">Vezi note</button></td>
        </tr>
      `

    } else {
      str += `
        <tr>
        <td>${list[i].name}</td>
        <td>${list[i].average}</td>
        <td><button class="buttons" onclick="showGrades(${i})">Vezi note</button></td>
        </tr>
      `
    }
  }
  return document.querySelector('#content tbody').innerHTML = str;
};

function drawGrades() {
  var str = "";

  for(var i = 0; i < list[status].grades.length; i++) {
    str += `
      <tr>
      <td></td>
      <td>${list[status].grades[i]}</td>
      <td></td>
      </tr>
    `
  }
  return document.querySelector('#contentGrades tbody').innerHTML = str;
};

function addStudent() {
  var name = document.querySelector('[name="name"]').value;
  var average = 0;
  var nrGrades = 0;
  var grades = [];
  var student= {
    name,
    average,
    nrGrades,
    grades
  }

  if(name == "") {
    event.preventDefault();
  } else {
    list.push(student);
    document.querySelector('[name="name"]').value = "";
    drawName();
    if(list.length == 1) {
      document.querySelector("#nrElevi").innerHTML = `Exista ${list.length} elev adaugat`
    } else {
      document.querySelector("#nrElevi").innerHTML = `Exista ${list.length} elevi adaugati`
    }
  }
};

function addGrade() {
  var grade = Number(document.querySelector('[name="grade"]').value);
  var sum = 0;

  if( grade === 0) {
    event.preventDefault()
  } else if(isNaN(grade)) {
    event.preventDefault()
  } else {
    list[status].grades.push(grade);
    for(var i = 0; i < list[status].grades.length; i++) {
      sum += list[status].grades[i]
    }
    list[status].nrGrades += 1;
    list[status].average = sum/list[status].nrGrades;
    document.querySelector('[name="grade"]').value = "";
    document.querySelector('#zeronote').innerHTML = "";
    drawName();
    drawGrades();
  }
};

function sortAverageAsc() {
  list.sort(
    function(a,b) {
      if(a["average"] < b["average"]) {
        return -1
      } else if(a["average"] > b["average"]){
        return 1;
      }else {
        return 0
      }
    }
  )
  drawName();
  document.querySelector("#note_elev_wrapper").classList.add("hidden");
}

function sortAverageDes() {
  list.sort(
    function(a,b) {
      if(a["average"] > b["average"]) {
        return -1
      } else if(a["average"] < b["average"]){
        return 1;
      }else {
        return 0
      }
    }
  )
  drawName();
  document.querySelector("#note_elev_wrapper").classList.add("hidden");
}
function sortGradesAsc() {
  list[status].grades.sort(
    function(a,b) {
      if(a > b) {
        return 1
      } else if(a < b){
        return -1;
      }else {
        return 0
      }
    }
  )
  drawGrades();
}

function sortGradesDes() {
  list[status].grades.sort(
    function(a,b) {
      if(a < b) {
        return 1
      } else if(a > b){
        return -1;
      }else {
        return 0
      }
    }
  )
  drawGrades();
}

function hideGrades() {
  return document.querySelector("#note_elev_wrapper").classList.add("hidden");
};

function showGrades(i) {
  document.querySelector("#note_elev_wrapper span").innerHTML = list[i].name
  document.querySelector("#note_elev_wrapper").classList.remove("hidden");
  status = i;
  drawGrades();
};

function enterStudents(event) {
  if( event.keyCode ===13) {
    addStudent();
  }
}
function enterGrade() {
  if( event.keyCode ===13) {
    addGrade();
  }
}
