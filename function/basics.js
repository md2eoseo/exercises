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

function mockify(str) {
  let mockified_str = "";
  for (let i = 0; i < str.length; i++)
    mockified_str +=
      Math.floor(Math.random() * 100) % 2 == 0
        ? str[i].toUpperCase()
        : str[i].toLowerCase();
  document.querySelector("h1").innerText = mockified_str;
}

function redAlert() {
  console.log("%cRed Alert!", "color:red; font-size:x-large");
}
function blueAlert() {
  console.log("%cBlue Alert!", "color:blue; font-size:large");
}
function yellowAlert() {
  console.log("%cYellow Alert!", "color:yellow; font-size:small");
}
function greenAlert() {
  console.log("%cGreen Alert!", "color:green; font-size:x-small");
}
function log(type) {
  type();
}

const people = ["HArry", "Ron", "Hermione", "Neville"];

function test(a, b, c, d) {
  console.log(a, b, c, d);
}

function isVowel(letter) {
  if (
    letter == "a" ||
    letter == "e" ||
    letter == "i" ||
    letter == "o" ||
    letter == "u"
  )
    return true;
  return false;
}

function numberOfVowels(text) {
  let vowels = 0;
  Array.from(text).forEach(letter => {
    if (isVowel(letter)) vowels++;
  });
  return vowels;
}

function start() {
  // console.log(numberOfVowels("asdfpoiu"));
  // arr.forEach parameters
  // currentValue, index, entireArray
  // people.forEach(test);
  // parameter로 function 넘길 수 있음
  // log(redAlert);
  // log(blueAlert);
  // log(yellowAlert);
  // log(greenAlert);
  // const firstName = "Seongtae",
  //   animalType = "dog",
  //   animalName = "Baduk";
  // console.log(sayHello("Seongtae"));
  // console.log(presentPet(firstName, animalType, animalName));
  // console.log(getColorString(214, 23, 12));
  // document.querySelector("body").style.backgroundColor = randomColor();
  // const name = prompt("string please!");
  // // console.log(capitalize(name));
  // // console.log(getNameParts(name));
  // // console.log(mockify(name));
  // setInterval(mockify, 500, name);
  // array value 수정 가능
  // const a = new Array(7);
  // const q = 7;
  // q = 6;
  // a[2] = 7;
  // a[2] = 6;
  // console.log(q);
}
