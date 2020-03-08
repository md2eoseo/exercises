"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  console.log("basics.js loaded");
  const response = await fetch("map.svg");
  const mySvgData = await response.text();
  document.querySelector("section#original").innerHTML = mySvgData;
  document.querySelector("section#zoomed").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  document.querySelectorAll("circle").forEach((ele, i) => {
    if (i === 1) ele.classList.add("glass");
  });
  HTML.glass = document.querySelector("#glass");
  HTML.original = document.querySelector("section#original g");
  HTML.original.setAttribute("clip-path", "");
  console.log(HTML.original);

  window.addEventListener("mousedown", function(e) {
    console.log("mousedown");
    move(e);
    window.addEventListener("mousemove", move);
  });
  window.addEventListener("mouseup", function(e) {
    console.log("mouseup");
    move(e);
    window.removeEventListener("mousemove", move);
  });

  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        HTML.glass.cx.baseVal.value -= 1;
        break;
      case 38:
        HTML.glass.cy.baseVal.value -= 1;
        break;
      case 39:
        HTML.glass.cx.baseVal.value += 1;
        break;
      case 40:
        HTML.glass.cy.baseVal.value += 1;
        break;
    }
  };
}

function move(e) {
  HTML.glass.setAttribute("cx", (e.pageX / window.innerWidth) * 950);
  HTML.glass.setAttribute(
    "cy",
    (e.pageY / window.innerHeight) *
      950 *
      (window.innerHeight / window.innerWidth)
  );
}
