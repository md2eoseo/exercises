"use strict";

window.addEventListener("DOMContentLoaded", start);

async function start() {
  const response = await fetch("final.svg");
  const timelineSVG = await response.text();
  document.querySelector("#svg").innerHTML = timelineSVG;
}
