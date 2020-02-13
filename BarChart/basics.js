"use strict";
window.addEventListener("DOMContentLoaded", start);

const num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let bar;
let numofbar;

function start() {
  if (num.length < 20) num.push(getNumberOfCustomers());
  else {
    num.shift();
    num.push(getNumberOfCustomers());
  }
  setHeight();
}

function setHeight() {
  for (let i = 0; i < num.length; i++) {
    bar = document.querySelector(`#bars > div:nth-child(${i + 1})`);
    bar.style.setProperty("--height", num[i]);
    numofbar = document.querySelector(`#nums > div:nth-child(${i + 1})`);
    numofbar.textContent = num[i];
  }
  document.querySelectorAll("#nums > div").forEach(
    (numofbar, i) =>
      function() {
        numofbar.innerHTML = num[i];
      }
  );

  setTimeout(start, 1000);
}

function getNumberOfCustomers() {
  return Math.floor(Math.random() * 32);
}
