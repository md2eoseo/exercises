"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  console.log("basics.js loaded");

  // const body = document.querySelector("body");
  const circles = document.querySelector("#circles");
  const clone = document.querySelector("#template");
  let num = 40;

  while (num--) {
    //   const div = document.createElement("div");
    //   div.classList.add("square");
    //   div.style.top = `${Math.random() * 1024}px`;
    //   div.style.left = `${Math.random() * 1024}px`;
    //   div.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() *
    //     256}, ${Math.random() * 256}`;
    //   body.appendChild(div);

    // const circle = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "circle"
    // );
    // circle.setAttribute("cx", Math.random() * 640);
    // circle.setAttribute("cy", Math.random() * 640);
    // circle.setAttribute(
    //   "fill",
    //   `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() *
    //     256}`
    // );
    // circle.setAttribute("r", 50);

    const circle = clone.querySelector("circle").cloneNode(true);

    circle.style.cx = Math.random() * 640;
    circle.style.cy = Math.random() * 640;
    circle.style.fill = `rgb(${Math.random() * 256}, ${Math.random() *
      256}, ${Math.random() * 256}`;
    // circle.style.r = 50;
    circles.appendChild(circle);
  }
}
