"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  console.log("basics.js loaded");
  const response = await fetch("map.svg");
  const mySvgData = await response.text();
  // document.querySelector("section#original").innerHTML = mySvgData;
  document.querySelector("section#zoomed").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  // document.querySelectorAll("clipPath").forEach((ele, i) => {
  //   if (i === 0) ele.classList.add("clip_original");
  //   if (i === 1) ele.classList.add("clip_zoomed");
  // });
  HTML.glass = document.querySelector("#glass");
  console.log(HTML.glass);

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
