"use strict";

window.addEventListener("DOMContentLoaded", start);

let movie = {};

async function start() {
  const response = await fetch("final.svg");
  const timelineSVG = await response.text();
  document.querySelector("#svg").innerHTML = timelineSVG;
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("potterfilms.json");
  movie = await response.json();
  clickable();
}

function clickable() {
  document
    .querySelectorAll(".bullet")
    .forEach((ele, i) =>
      ele.addEventListener("click", e => console.log(movie[i]))
    );
}
