"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  console.log("basics.js loaded");

  const body = document.querySelector("body");
  let num = 40;

  while (num--) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.style.top = `${Math.random() * 1024}px`;
    div.style.left = `${Math.random() * 1024}px`;
    div.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() *
      256}, ${Math.random() * 256}`;
    body.appendChild(div);
  }
}
