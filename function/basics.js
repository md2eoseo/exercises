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

function capitalize(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

function getNameParts(fullname) {
  let str = fullname
    .substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "))
    .split(" ");
  for (let i = 0; i < str.length; i++) str[i] = capitalize(str[i]);
  return {
    firstName: capitalize(fullname.substring(0, fullname.indexOf(" "))),
    middleName: str.join(" "),
    lastName: capitalize(fullname.substring(fullname.lastIndexOf(" ") + 1))
  };
}

function start() {
  const firstName = "Seongtae",
    animalType = "dog",
    animalName = "Baduk";
  console.log(sayHello("Seongtae"));
  console.log(presentPet(firstName, animalType, animalName));
  console.log(getColorString(214, 23, 12));
  document.querySelector("body").style.backgroundColor = randomColor();

  const name = prompt("Name please!");
  // console.log(capitalize(name));
  console.log(getNameParts(name));

  // const a = new Array(7);
  // const q = 7;
  // q = 6;
  // a[2] = 7;
  // a[2] = 6;
  // console.log(q);
}
