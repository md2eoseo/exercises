"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let color = "";

async function start() {
  const response = await fetch("assets/minicoloringbook.svg");
  const mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

// colors: .st2 .st3 .st4
// shapes: .st5

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.colors = document.querySelectorAll(".st2, .st3, .st4");
  HTML.shapes = document.querySelectorAll(".st5");

  HTML.colors.forEach(ele =>
    ele.addEventListener("click", function(e) {
      console.log("colors!!");
      color = ele.getAttribute("fill");
    })
  );
  HTML.shapes.forEach(ele =>
    ele.addEventListener("click", function(e) {
      console.log("shapes!!");
      ele.style.fill = color;
    })
  );
}
