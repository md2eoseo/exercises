"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const url1 = "http://petlatkea.dk/2020/hogwarts/students.json";
const url2 = "http://petlatkea.dk/2020/hogwarts/families.json";
let fileCounter = 0;

function start() {
  console.log("basics.js loaded");
  fileCounter = 0;
  console.log("1");
  loadJSON(url1, "a");
  console.log("2");
  loadJSON(url2, "b");
  console.log("6");
}

function itsDone() {
  fileCounter++;
  if (fileCounter == 2) console.log("All FILE LOADED!!!");
}

async function loadJSON(url, prefix) {
  console.log(`${prefix}-3`);
  const response = await fetch(url);
  console.log(`${prefix}-4`);
  const jsonData = await response.json();
  console.log(`${prefix}-5`);
  itsDone();
}
