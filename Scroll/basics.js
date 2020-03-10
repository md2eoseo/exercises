"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  console.log("basics.js loaded");
  HTML.cnt = document.querySelector(".the_container");
  HTML.cnt.addEventListener("scroll", scrolling);
  scrolling();
}

function scrolling() {
  const ratio =
    HTML.cnt.scrollTop / (HTML.cnt.scrollHeight - HTML.cnt.clientHeight);
  document
    .querySelector("#scrollinfo")
    .style.setProperty("--scroll-ratio", ratio);
}
