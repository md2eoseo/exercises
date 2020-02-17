"use strict";
window.addEventListener("DOMContentLoaded", start);
// canvas gradients
// https://www.w3schools.com/graphics/canvas_gradients.asp
// CanvasRenderingContext2D.getImageData()
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
// mouseup mousemove mousedown
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event

const HTML = {};

function setting() {
  HTML.canvas = document.querySelector(".canvas");
  const colorCtx = HTML.canvas.getContext("2d");

  let gradient = colorCtx.createLinearGradient(0, 0, HTML.canvas.width, 0);
  gradient.addColorStop(0, "rgb(255, 0, 0)");
  gradient.addColorStop(0.15, "rgb(255, 0, 255)");
  gradient.addColorStop(0.33, "rgb(0, 0, 255)");
  gradient.addColorStop(0.49, "rgb(0, 255, 255)");
  gradient.addColorStop(0.67, "rgb(0, 255, 0)");
  gradient.addColorStop(0.84, "rgb(255, 255, 0)");
  gradient.addColorStop(1, "rgb(255, 0, 0)");
  colorCtx.fillStyle = gradient;
  colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);

  gradient = colorCtx.createLinearGradient(0, 0, 0, HTML.canvas.height);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
  colorCtx.fillStyle = gradient;
  colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);

  // console.log(HTML.canvas.width, HTML.canvas.height);
  // console.log(colorCtx.canvas.width, colorCtx.canvas.height);

  let colorX, colorY, colorTimer, r, g, b;
  setColor(0, 0, 0);

  HTML.canvas.addEventListener("mousedown", function() {
    colorTimer = setInterval(function() {
      const imageData = colorCtx.getImageData(colorX, colorY, 1, 1);
      r = imageData.data[0];
      g = imageData.data[1];
      b = imageData.data[2];

      // console.log("hsl(%d,%d%,%d%)", h, s, l);
      // console.log(imageData);
    }, 50);

    setColor(r, g, b);
  });

  HTML.canvas.addEventListener("mousemove", function(e) {
    colorX = e.pageX;
    colorY = e.pageY - 440;
    // console.log(`x,y -> ${colorX},${colorY}`);
    setColor(r, g, b);
  });

  window.addEventListener("mouseup", function(e) {
    clearInterval(colorTimer);
    setColor(r, g, b);
  });
}

function setColor(r, g, b) {
  let h, s, l;
  const rr = r / 255,
    gg = g / 255,
    bb = b / 255;
  const min = Math.min(rr, gg, bb);
  const max = Math.max(rr, gg, bb);
  if (max === min) h = 0;
  else if (max === rr) h = 60 * (0 + (gg - bb) / (max - min));
  else if (max === gg) h = 60 * (2 + (bb - rr) / (max - min));
  else if (max === bb) h = 60 * (4 + (rr - gg) / (max - min));
  if (h < 0) h = h + 360;
  l = (min + max) / 2;
  if (max === 0 || min === 1) s = 0;
  else s = (max - l) / Math.min(l, 1 - l);
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);

  HTML.show = document.querySelector("#color_palette_show");
  HTML.hex = document.querySelector(".hex");
  HTML.rgb = document.querySelector(".rgb");
  HTML.hsl = document.querySelector(".hsl");
  HTML.hex.innerText = `#${r.toString(16) == 0 ? "00" : r.toString(16)}${
    g.toString(16) == 0 ? "00" : g.toString(16)
  }${b.toString(16) == 0 ? "00" : b.toString(16)}`;
  HTML.rgb.innerText = `${r}, ${g}, ${b}`;
  HTML.hsl.innerText = `${h}, ${s}%, ${l}%`;
  HTML.show.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function start() {
  document.querySelector("#color").addEventListener("change", function(e) {
    console.log(r.toString(16));
  });
  setting();
}
