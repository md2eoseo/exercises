"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("basics.js loaded");

  let name = "PETERasEFEGsdfEW";

  let result =
    name.substring(0, 2).toLowerCase() +
    name[2].toUpperCase() +
    name.substring(3).toLowerCase();
  console.log(result);
}
