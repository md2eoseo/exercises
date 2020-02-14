"use strict";

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const allAnimals = [];
const Animal = {
  name: "",
  type: "",
  desc: "",
  age: 0
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const animal = Object.create(Animal);
    const animal_fullname = jsonObject.fullname;

    animal.name = animal_fullname.substring(0, animal_fullname.indexOf(" "));
    animal.type = animal_fullname.substring(animal_fullname.lastIndexOf(" "));
    animal.desc = animal_fullname.substring(
      animal_fullname.indexOf(" ") + 5,
      animal_fullname.lastIndexOf(" ")
    );
    animal.age = jsonObject.age;

    console.log(allAnimals.push(animal));
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
