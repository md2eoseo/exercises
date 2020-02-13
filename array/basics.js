"use strict";
window.addEventListener("DOMContentLoaded", start);
const num = [];
function start() {
  if (num.length < 9) num.unshift(num.length);
  else num.unshift(num.pop() + 9);
  console.log(num);
  setTimeout(start, 500);
}
