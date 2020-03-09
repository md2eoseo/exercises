"use strict";

window.addEventListener("DOMContentLoaded", start);

const balloons = document.querySelector("#balloons");
console.log(balloons);

async function start() {
  // load the SVG into #balloon
  const response = await fetch("Yellow_toy_balloon.svg");
  const balloonSVG = await response.text();
  document.querySelector("#balloon").innerHTML = balloonSVG;
  // then call createBalloons
  createBalloons();
}

function createBalloons() {
  for (let i = 0; i < 40; i++) {
    createBalloon();
  }
}

function createBalloon() {
  // create a single balloon, using the #yellow_balloon
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  // give it a random x and y
  use.setAttribute("href", "#yellow_balloon");
  use.setAttribute("x", `${Math.random() * 5000}`);
  use.setAttribute("y", `${Math.random() * 10000}`);

  console.log(use);
  // maybe also add a bit of animation ...
  // before adding it to the #balloons
  balloons.append(use);
  // use.appendChild(balloons);
}
