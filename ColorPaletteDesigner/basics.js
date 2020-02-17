"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  document.querySelector("#color").addEventListener("change", function(e) {
    console.log(this.value);
  });
}
