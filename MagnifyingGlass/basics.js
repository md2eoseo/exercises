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

function startManipulatingTheSvg() {}
