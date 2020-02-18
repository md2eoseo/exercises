window.addEventListener("DOMContentLoaded", start);

const HTML = {};

console.log(sayHello("before the function declared"));

function sayHello(firstName) {
  return `Hello ${firstName}`;
}

function presentPet(firstName, animalType, animalName) {
  return `My name is ${firstName}, I have a ${animalType} called ${animalName}`;
}

function getColorString(r, g, b) {
  return `rgb(${r},${g},${b})`;
}

function randomColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() *
    255})`;
}

function start() {
  const firstName = "Seongtae",
    animalType = "dog",
    animalName = "Baduk";
  console.log(sayHello("Seongtae"));
  console.log(presentPet(firstName, animalType, animalName));
  console.log(getColorString(214, 23, 12));
  document.querySelector("body").style.backgroundColor = randomColor();

  // const a = new Array(7);
  // const q = 7;
  // q = 6;
  // a[2] = 7;
  // a[2] = 6;
  // console.log(q);
}
