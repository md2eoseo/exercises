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
  HTML.close_box = document.querySelectorAll(".closebutton");
  HTML.close_box.forEach(btn =>
    btn.addEventListener("click", function() {
      document.querySelector("#onlyonekind").classList.remove("show");
      document.querySelector("#onlytwowinners").classList.remove("show");
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

function displayAnimal(animal, i) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data

  // TODO: Display winner

  // TODO: Display star

  clone.querySelector("[data-field=winner]").textContent = animal.winner
    ? "🏆"
    : "☆";
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // TODO: Add event listeners for star and winner

  HTML.winner = clone.querySelector("[data-field=winner]");
  HTML.winner.addEventListener("click", function() {
    // if clicks checked winner button
    if (allAnimals[i].winner === true) {
      allAnimals[i].winner = false;
      winners.splice(
        winners.findIndex(type => type === allAnimals[i].type),
        1
      );
    }
    // if clicks unchecked winner button
    else if (allAnimals[i].winner === false) {
      if (winners.length == 0) {
        allAnimals[i].winner = true;
        winners.push(allAnimals[i].type);
      } else if (winners.length == 1) {
        if (winners[0] == allAnimals[i].type) {
          document.querySelector("#onlyonekind").classList.add("show");
        } else {
          allAnimals[i].winner = true;
          winners.push(allAnimals[i].type);
        }
      }
    }

    buildList();
  });

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
