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
  document.querySelectorAll(".bullet").forEach((ele, i) =>
    ele.addEventListener("click", e => {
      console.log(movie[i]);
      document.querySelector("text#title_original").innerHTML =
        movie[i].title.original;
      document.querySelector("text#title_danish").innerHTML =
        movie[i].title.danish;
      document.querySelector("text#year").innerHTML = movie[i].year;
      document.querySelector("text#length").innerHTML = movie[i].length;
      document.querySelector("text#director").innerHTML = movie[i].director;
      document.querySelector("text#writers_screenplay").innerHTML =
        movie[i].writers.screenplay;
      document.querySelector(
        "image#poster"
      ).href.baseVal = `images/${movie[i].poster}`;
    })
  );
}
