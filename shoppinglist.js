var products = [];

function add() {
  var newProd = document.querySelector('#product').value;
  var state = "mustBeBought";
  var trToBeInserted = {
    newProd,
    state,
  }

  if (newProd === "") {
    event.preventDefault()
  } else if (products.length == 0) {
    products.push(trToBeInserted);
    draw();
    document.querySelector('#product').value = "";
    document.querySelector(".hidden").classList.remove("hidden");
  } else {
    products.push(trToBeInserted);
    draw();
    document.querySelector('#product').value = "";
  }
};

function draw(){
  var str = ``;
  for(var i = 0;i < products.length; i++){
    if(products[i].state == "bought") {
      str += `
      <tr>
        <td id="${i}" class="linethrough">${products[i].newProd}</td>
        <td><button type="button" class="markbutton" onclick="mark(${i})">Mark as bought</button></td>
      </tr>
      `
    } else {
      str += `
      <tr>
        <td id="${i}">${products[i].newProd}</td>
        <td><button type="button" class="markbutton" onclick="mark(${i})">Mark as bought</button></td>
      </tr>
      `
    }
  }
  document.querySelector("table > tbody").innerHTML=str;
};

function mark(i) {
  document.getElementById(i).classList.add("linethrough");
  products[i].state = "bought";
};

function sortAsc() {
  products.sort(
    function(a,b) {
      if(a["newProd"] < b["newProd"]) {
        return -1
      } else if(a["newProd"] > b["newProd"]){
        return 1;
      }else {
        return 0
      }
    }
  )
  draw()
};

function sortDesc() {
  products.sort(
    function(a,b) {
      if(a["newProd"] > b["newProd"]) {
        return -1
      } else if(a["newProd"] < b["newProd"]){
        return 1;
      }else {
        return 0
      }
    }
  )
  draw()
};

function enter(event) {
  if (event.keyCode === 13) {
    add();
  }
};
