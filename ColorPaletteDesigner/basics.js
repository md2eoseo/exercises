"use strict";
window.addEventListener("DOMContentLoaded", start);
// canvas gradients
// https://www.w3schools.com/graphics/canvas_gradients.asp
// CanvasRenderingContext2D.getImageData()
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
// mouseup mousemove mousedown
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event

const HTML = {};
let mode = "analogous";

function setting() {
  HTML.canvas = document.querySelector("canvas");
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

  let colorX,
    colorY,
    colorTimer,
    r = 0,
    g = 0,
    b = 0;

  const rad = document.select_mode.mode;
  // let prev = null;
  for (let i = 0; i < rad.length; i++) {
    rad[i].addEventListener("change", function() {
      // prev ? console.log(prev.value) : null;
      // if (this !== prev) prev = this;
      console.log(this.value);
      mode = this.value;
      setColor(r, g, b);
    });
  }

  setColor(r, g, b);

  HTML.canvas.addEventListener("mousedown", function(e) {
    // 마우스 기준점
    colorX = e.pageX;
    colorY = e.pageY;
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
    // 마우스 기준점
    colorX = e.pageX;
    colorY = e.pageY;
    // console.log(`x,y -> ${colorX},${colorY}`);
    setColor(r, g, b);
  });

  window.addEventListener("mouseup", function(e) {
    // 마우스 기준점
    colorX = e.pageX;
    colorY = e.pageY;
    clearInterval(colorTimer);
    setColor(r, g, b);
  });
}

function pad(n, width) {
  n += "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

function hsl2rgb(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}

function rgb2hsl(r, g, b) {
  let h, s, l;
  r /= 255;
  g /= 255;
  b /= 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) h = 0;
  else if (max === r) h = 60 * (0 + (g - b) / (max - min));
  else if (max === g) h = 60 * (2 + (b - r) / (max - min));
  else if (max === b) h = 60 * (4 + (r - g) / (max - min));
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
  return [h, s, l];
}

function rgb2hex(r, g, b) {
  return `#${pad(Number(r).toString(16), 2)}${pad(
    Number(g).toString(16),
    2
  )}${pad(Number(b).toString(16), 2)}`;
}

function rgb2str(r, g, b) {
  return `rgb(${r},${g},${b})`;
}

function str2rgb(str) {
  let r = str.substring(str.indexOf("(") + 1, str.indexOf(",")),
    g = str.substring(str.indexOf(",") + 1, str.lastIndexOf(",")),
    b = str.substring(str.lastIndexOf(",") + 1, str.indexOf(")"));
  return [r, g, b];
}

function setColor(r, g, b) {
  const hsl = rgb2hsl(r, g, b);
  HTML.base_box = document.querySelector("#base_box");
  HTML.other_box = document.querySelectorAll(".other_box");
  HTML.hex = document.querySelector("#color_palette_detail .hex");
  HTML.rgb = document.querySelector("#color_palette_detail .rgb");
  HTML.hsl = document.querySelector("#color_palette_detail .hsl");
  HTML.other_hex = document.querySelectorAll(".other_color .hex");
  HTML.other_rgb = document.querySelectorAll(".other_color .rgb");
  HTML.other_hsl = document.querySelectorAll(".other_color .hsl");
  HTML.hex.innerText = rgb2hex(r, g, b);
  HTML.rgb.innerText = `${r}, ${g}, ${b}`;
  HTML.hsl.innerText = `${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%`;
  HTML.base_box.style.backgroundColor = rgb2str(r, g, b);

  if (mode == "analogous") setOtherColorAnalogous(hsl[0], hsl[1], hsl[2]);
  if (mode == "monochromatic")
    setOtherColorMonochromatic(hsl[0], hsl[1], hsl[2]);
  if (mode == "triad") setOtherColorTriad(hsl[0], hsl[1], hsl[2]);
  if (mode == "complementary")
    setOtherColorComplementary(hsl[0], hsl[1], hsl[2]);
  if (mode == "compound") setOtherColorCompound(hsl[0], hsl[1], hsl[2]);
  if (mode == "shades") setOtherColorShades(hsl[0], hsl[1], hsl[2]);
}

function setOtherColorAnalogous(h, s, l) {
  // H is shifted a few degrees for each color. S and L are kept constant
  HTML.other_box.forEach((e, i) => {
    let changed_h = h;
    i / 2 < 1
      ? (changed_h = (h - (2 - i) * 30) % 360)
      : (changed_h = (h + (i + 1) * 30) % 360);
    e.style.backgroundColor = hsl2rgb(changed_h, s, l);
    const rgb = str2rgb(hsl2rgb(changed_h, s, l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${changed_h}, ${s}%, ${l}%`;
  });
}

function setOtherColorMonochromatic(h, s, l) {
  // H is kept constant, each color has either more S, less S, more L or less L (only one change on each color).
  HTML.other_box.forEach((e, i) => {
    let changed_s = s - (4 - i) * 20;
    e.style.backgroundColor = hsl2rgb(h, changed_s, l);
    const rgb = str2rgb(hsl2rgb(h, changed_s, l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${h}, ${changed_s}%, ${l}%`;
  });
}

function setOtherColorTriad(h, s, l) {
  // Two colors are shifted 60 or 120 degrees from the base. You decide what to do with the two remaining colors. Usually also shifting them, and adjusting the L is prefered.
  HTML.other_box.forEach((e, i) => {
    let changed_h = h;
    i / 2 < 1 ? (changed_h = (h + 60) % 360) : (changed_h = (h + 120) % 360);
    e.style.backgroundColor = hsl2rgb(changed_h, s, l);
    const rgb = str2rgb(hsl2rgb(changed_h, s, l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${changed_h}, ${s}%, ${l}%`;
  });
}

function setOtherColorComplementary(h, s, l) {
  // One color is at 180 degrees from the base. You decide how to handle the other three!
  HTML.other_box.forEach((e, i) => {
    let changed_h = (h + 180) % 360;
    e.style.backgroundColor = hsl2rgb(changed_h, s, l);
    const rgb = str2rgb(hsl2rgb(changed_h, s, l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${changed_h}, ${s}%, ${l}%`;
  });
}

function setOtherColorCompound(h, s, l) {
  // A combination of complementary and analogous - you decide how many colors are complementary, and how many are analogous
  HTML.other_box.forEach((e, i) => {
    let changed_h = h;
    i / 2 < 1
      ? (changed_h = (h - (2 - i) * 72) % 360)
      : (changed_h = (h + ((i % 2) + 1) * 72) % 360);
    e.style.backgroundColor = hsl2rgb(changed_h, s, l);
    const rgb = str2rgb(hsl2rgb(changed_h, s, l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${changed_h}, ${s}%, ${l}%`;
  });
}

function setOtherColorShades(h, s, l) {
  // H is kept constant, a so is S, but L varies for each color.
  HTML.other_box.forEach((e, i) => {
    let changed_l = l;
    i / 2 < 1
      ? (changed_l =
          l - (2 - i) * 20 < 0
            ? l - (2 - i) * 20 + 100
            : (l - (2 - i) * 20) % 100)
      : (changed_l = (l + ((i % 2) + 1) * 20) % 100);
    e.style.backgroundColor = hsl2rgb(h, s, changed_l);
    const rgb = str2rgb(hsl2rgb(h, s, changed_l));
    HTML.other_hex[i].innerText = rgb2hex(rgb[0], rgb[1], rgb[2]);
    HTML.other_rgb[i].innerText = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    HTML.other_hsl[i].innerText = `${h}, ${s}%, ${changed_l}%`;
  });
}

function start() {
  setting();
}
