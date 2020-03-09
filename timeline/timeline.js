"use strict";

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
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
      // modifying infobox with selected movie data
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

      // move infobox line
      HTML.line = document.querySelector(".st0");
      HTML.line.setAttribute("x1", Math.floor(ele.cx.baseVal.value));
      HTML.line.setAttribute("y1", Math.floor(ele.cy.baseVal.value));
      HTML.line.setAttribute("x2", HTML.line.x1.baseVal.value + 54);
      HTML.line.setAttribute("y2", HTML.line.y1.baseVal.value - 205);
    })
  );
}
