"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  const response = await fetch("assets/tiger.svg");
  const mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

// id: g302 g306 g350 g474

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.eyes = document.querySelectorAll("#g302, #g350");
  HTML.eyes_ = document.querySelectorAll("#g306, #g474");
  HTML.all = document.querySelectorAll("g");
  HTML.all.forEach(ele =>
    ele.addEventListener("mouseenter", function(e) {
      if (e.target == HTML.eyes[0] || e.target == HTML.eyes[1])
        e.target.style.fill = "red";
      else if (e.target == HTML.eyes_[0] || e.target == HTML.eyes_[1])
        e.target.style.fill = "#E8260C";
      else e.target.style.fill = "black";
    })
  );
}
