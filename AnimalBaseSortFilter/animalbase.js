"use strict";

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  HTML.filter = document
    .querySelectorAll("[data-action='filter']")
    .forEach(btn => {
      btn.addEventListener("click", filterButton);
    });

  HTML.sort = document.querySelectorAll("[data-action='sort']").forEach(btn => {
    btn.addEventListener("click", sortButton);
  });

  loadJSON();
}

function sortAnimalsByData(data) {
  const result = allAnimals.sort(compareFunction);

  function compareFunction(a, b) {
    if (a[data] < b[data]) return -1;
    else if (a[data] === b[data]) return 0;
    else return 1;
  }
  return result;
}

function sortButton(e) {
  let selected_sort = "";

  selected_sort = e.target.dataset.sort;
  console.log("sort type : " + selected_sort);
  displayList(sortAnimalsByData(selected_sort));
}

function filterAnimalsByType(type) {
  const result = allAnimals.filter(filterFunction);

  function filterFunction(animal) {
    if (animal.type === type) return true;
    else return false;
  }
  return result;
}

function filterButton(e) {
  let selected_filter = "*";

  selected_filter = e.target.dataset.filter;
  console.log("filter type : " + selected_filter);
  if (selected_filter === "*") displayList(allAnimals);
  else displayList(filterAnimalsByType(selected_filter));
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
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
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
