"use strict";
window.addEventListener("DOMContentLoaded", start);

const num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function start() {
  num.shift();
  num.push(getNumberOfCustomers());
  setHeight();
}

function setHeight() {
  for (let i = 0; i < num.length; i++) {
    const bar = document.querySelector(`#bars > div:nth-child(${i + 1})`);
    const numofbar = document.querySelector(`#nums > div:nth-child(${i + 1})`);
    bar.style.setProperty("--height", num[i]);
    numofbar.textContent = num[i];
  }
  // document.querySelectorAll("#bars > div").forEach(
  //   (bar, i) =>
  //     function() {
  //       bar.style.setProperty("--height", num[i]);
  //     }
  // );
  // document.querySelectorAll("#nums > div").forEach(
  //   (numofbar, i) =>
  //     function() {
  //       numofbar.textContent = num[i];
  //     }
  // );

  setTimeout(start, 1000);
}

function getNumberOfCustomers() {
  return Math.floor(Math.random() * 32);
}
