"use strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("basics.js loaded");

  let name = "pETERasEFEGsdfEW";

  let result = name[0].toUpperCase() + name.substring(1).toLowerCase();
  console.log(result);
}
