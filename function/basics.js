window.addEventListener("DOMContentLoaded", start);

const HTML = {};

sayHello("1");
const firstName = "Seongtae",
  animalType = "dog",
  animalName = "Baduk";

function sayHello(firstName) {
  console.log(`Hello ${firstName}`);
}

function presentPet(firstName, animalType, animalName) {
  console.log(
    `My name is ${firstName}, I have a ${animalType} called ${animalName}`
  );
}
function start() {
  let i = -15;
  let len = 10;
  sayHello("Seongtae");
  presentPet(firstName, animalType, animalName);
  i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
  console.log(i);
}
