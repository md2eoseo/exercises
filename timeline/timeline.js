"use strict";

window.addEventListener("DOMContentLoaded", start);

async function start() {
  const response = await fetch("final.svg");
  const timelineSVG = await response.text();
  document.querySelector("#svg").innerHTML = timelineSVG;
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("potterfilms.json");
  const jsonData = await response.json();
  console.log(jsonData);
}

// function createBalloon() {
//   // create a single balloon, using the #yellow_balloon
//   const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
//   // give it a random x and y
//   use.setAttribute("href", "#yellow_balloon");
//   use.setAttribute("x", `${Math.random() * 5000}`);
//   use.setAttribute("y", `${Math.random() * 10000}`);

//   console.log(use);
//   // maybe also add a bit of animation ...
//   // before adding it to the #balloons
//   balloons.append(use);
//   // use.appendChild(balloons);
// }
