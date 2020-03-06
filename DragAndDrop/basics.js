"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  const response = await fetch("yy.svg");
  const mySvgData = await response.text();
  document.querySelector(".svg").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.svg = document.querySelector(".svg");
}
