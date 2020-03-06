"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  const response = await fetch("yy.svg");
  const mySvgData = await response.text();
  document.querySelector("#svg").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.svg = document.querySelector("#svg");
  HTML.circle = document.querySelector("#svg circle");

  HTML.circle.addEventListener("mousedown", function() {
    HTML.circle.addEventListener("mousemove", move);
  });

  window.addEventListener("mouseup", function() {
    HTML.circle.removeEventListener("mousemove", move);
  });
}

function move(e) {
  e.target.setAttribute("cx", (e.pageX / window.innerWidth) * 512);
  e.target.setAttribute(
    "cy",
    (e.pageY / window.innerHeight) *
      512 *
      (window.innerHeight / window.innerWidth)
  );
}
