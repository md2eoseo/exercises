"use strict";

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let allAnimals = [];
let winners = [];

const settings = {
  filter: null,
  sortBy: null,
  sortDir: "asc"
};

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
  winner: false
  // TODO: Add winner-info
};

function start() {
  console.log("ready");

  loadJSON();

  // TODO: Add event-listeners to filter and sort buttons
  HTML.error1 = document.querySelector("#onlytwowinners");
  HTML.error1animal1 = document.querySelector("#onlytwowinners .animal1");
  HTML.error1animal2 = document.querySelector("#onlytwowinners .animal2");
  HTML.error1remove1 = document.querySelector(
    "#onlytwowinners [data-action='remove1']"
  );
  HTML.error1remove2 = document.querySelector(
    "#onlytwowinners [data-action='remove2']"
  );
  HTML.error2 = document.querySelector("#onlyonekind");
  HTML.error2animal = document.querySelector("#onlyonekind .animal1");
  HTML.error2remove = document.querySelector(
    "#onlyonekind [data-action='remove1']"
  );
  HTML.close_box = document.querySelectorAll(".closebutton");
  HTML.close_box.forEach(btn =>
    btn.addEventListener("click", function() {
      document.querySelector("#onlytwowinners").classList.remove("show");
      document.querySelector("#onlyonekind").classList.remove("show");
    })
  );
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  buildList();
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;
  animal.winner = false;

  return animal;
}

function buildList() {
  const currentList = allAnimals; // TODO: Add filter and sort on this list, before displaying
  displayList(currentList);
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data

  clone.querySelector("[data-field=winner]").textContent = animal.winner
    ? "🏆"
    : "☆";
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // TODO: Add event listeners for star and winner
  // added const
  const winner_btn = clone.querySelector("[data-field=winner]");
  winner_btn.addEventListener("click", function() {
    selectWinner(animal);
  });

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

function selectWinner(animal) {
  let error2remove_idx = 0;
  // if clicks checked winner button
  if (animal.winner === true) {
    animal.winner = false;
    winners.splice(
      winners.findIndex(selected => selected === animal),
      1
    );
    buildList();
    console.table(winners);
  }
  // if clicks unchecked winner button
  else if (animal.winner === false) {
    if (winners.length == 0) {
      animal.winner = true;
      winners.push(animal);
      buildList();
      console.table(winners);
    } else if (winners.length == 1) {
      if (animal.type == winners[0].type) {
        HTML.error2animal.innerText = `${winners[0].name}, the ${winners[0].type}`;
        HTML.error2remove.addEventListener("click", error2remove);
        HTML.error2.classList.add("show");
      } else {
        animal.winner = true;
        winners.push(animal);
        buildList();
        console.table(winners);
      }
    } else if (winners.length == 2) {
      let error = 1;
      error2remove_idx = 0;
      for (let idx = 0; idx < winners.length; idx++) {
        if (animal.type == winners[idx].type) {
          error = 2;
          error2remove_idx = idx;
          break;
        }
      }

      if (error == 1) {
        HTML.error1animal1.innerText = `${winners[0].name}, the ${winners[0].type}`;
        HTML.error1animal2.innerText = `${winners[1].name}, the ${winners[1].type}`;
        HTML.error1remove1.addEventListener("click", error1remove1);
        HTML.error1remove2.addEventListener("click", error1remove2);
        HTML.error1.classList.add("show");
      } else if (error == 2) {
        HTML.error2animal.innerText = `${winners[error2remove_idx].name}, the ${winners[error2remove_idx].type}`;
        HTML.error2remove.addEventListener("click", error2remove);
        HTML.error2.classList.add("show");
      }
    }
  }

  function error1remove1() {
    winners[0].winner = false;
    animal.winner = true;
    winners.shift();
    winners.push(animal);
    HTML.error1.classList.remove("show");
    HTML.error1remove1.removeEventListener("click", error1remove1);
    HTML.error1remove2.removeEventListener("click", error1remove2);
    buildList();
    console.table(winners);
  }

  function error1remove2() {
    winners[1].winner = false;
    animal.winner = true;
    winners.pop();
    winners.push(animal);
    HTML.error1.classList.remove("show");
    HTML.error1remove1.removeEventListener("click", error1remove1);
    HTML.error1remove2.removeEventListener("click", error1remove2);
    buildList();
    console.table(winners);
  }

  function error2remove() {
    // I used code below before. But, Object share same ID even they copied from original.
    // allAnimals[
    //   allAnimals.findIndex(o => o === winners[0])
    // ].winner = false;
    winners[error2remove_idx == 0 ? 0 : 1].winner = false;
    animal.winner = true;
    if (error2remove_idx == 0) {
      winners.shift();
      winners.push(animal);
    } else if (error2remove_idx == 1) {
      winners.pop();
      winners.push(animal);
    }
    HTML.error2.classList.remove("show");
    HTML.error2remove.removeEventListener("click", error2remove);
    buildList();
    console.table(winners);
  }
}
