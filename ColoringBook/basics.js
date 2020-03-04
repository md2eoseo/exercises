"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let color = "";

async function start() {
  const response = await fetch("assets/skull.svg");
  const mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

// shapes: .st0 .st1 .st2

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  // HTML.colors = document.querySelectorAll("");
  HTML.shapes = document.querySelectorAll(".st0, .st1, .st2");

  // HTML.colors.forEach(ele =>
  //   ele.addEventListener("click", function(e) {
  //     console.log("colors!!");
  //     color = ele.getAttribute("fill");
  //   })
  // );
  HTML.shapes.forEach(ele =>
    ele.addEventListener("click", function(e) {
      console.log("shapes!!");
    })
  );
}
