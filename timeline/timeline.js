"use strict";

window.addEventListener("DOMContentLoaded", start);

async function start() {
  const response = await fetch("final.svg");
  const timelineSVG = await response.text();
  document.querySelector("#svg").innerHTML = timelineSVG;
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("potterfilms.json");
  const jsonData = await response.json();
  console.log(jsonData);
}
