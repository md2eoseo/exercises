"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  // const response = await fetch("yy.svg");
  // const mySvgData = await response.text();
  // document.querySelector("#svg").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  // HTML.circle = document.querySelector("#svg circle");
  HTML.img = document.querySelector("#svg");
  HTML.image = document.querySelector("image");

  HTML.img.addEventListener("mousedown", function() {
    console.log("mousedown");
    HTML.img.addEventListener("mousemove", move);
  });

  window.addEventListener("mouseup", function() {
    console.log("mouseup");
    HTML.img.removeEventListener("mousemove", move);
  });

  // HTML.circle.addEventListener("mousedown", function() {
  //   HTML.circle.addEventListener("mousemove", move);
  // });

  // window.addEventListener("mouseup", function() {
  //   HTML.circle.removeEventListener("mousemove", move);
  // });
}

function move(e) {
  e.preventDefault();

  HTML.image.setAttribute("x", (e.pageX / window.innerWidth) * 1024);
  HTML.image.setAttribute(
    "y",
    (e.pageY / window.innerHeight) *
      1024 *
      (window.innerHeight / window.innerWidth)
  );
}
