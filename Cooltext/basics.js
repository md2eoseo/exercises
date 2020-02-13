"use strict";
window.addEventListener("DOMContentLoaded", start);

const cooltext = document.querySelector("#cooltext").textContent;
let i = 0;

function start() {
  document.querySelector("#cooltext").textContent = "";
  // document.querySelector("#cooltext").style.visibility = "hidden";
  console.log(cooltext);
  cool();
}

function cool() {
  if (i < cooltext.length) {
    const letter = cooltext[i++];
    const span = document.createElement("span");
    span.textContent = letter;
    document.querySelector("#cooltext").appendChild(span);
    span.classList.add("cool");
    setTimeout(cool, 50);
  }
}
