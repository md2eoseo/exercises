"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};
let color = "";

async function start() {
  const response = await fetch("assets/skull.svg");
  const mySvgData = await response.text();
  document.querySelector(".svg").innerHTML = mySvgData;
  startManipulatingTheSvg();
}

// shapes: .st0 .st1 .st2

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.colors = document.querySelectorAll(".color");
  HTML.current_color = document.querySelector(".current_color");
  HTML.shapes = document.querySelectorAll(".st0, .st1, .st2");
  HTML.reset = document.querySelector(".reset");

  HTML.colors.forEach(ele =>
    ele.addEventListener("click", function(e) {
      console.log("colors!!");
      // dataset 도 이용 가능함
      // 나는 css 에 기술해놓음
      color = window.getComputedStyle(ele).getPropertyValue("background-color");
      console.log(color);
      HTML.current_color.style.backgroundColor = color;
    })
  );
  HTML.shapes.forEach(ele =>
    ele.addEventListener("click", function(e) {
      console.log("shapes!!");
      ele.style.fill = color;
    })
  );

  HTML.reset.addEventListener("click", function() {
    console.log("reset!!");
    HTML.shapes.forEach(ele => (ele.style.fill = "transparent"));
  });
}
