"use strict";
window.addEventListener("DOMContentLoaded", start);
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const btn = document.querySelector("#btn");
const opt = document.querySelector("#opt");
let optnum = 0;
let str = "";
let i = 0;

function start() {
  opt.addEventListener("change", function() {
    optnum = this.value;
  });

  btn.addEventListener("click", function() {
    console.log(input.value, optnum);
    str = input.value;

    if (optnum == 1)
      output.value = str[0].toUpperCase() + str.substring(1).toLowerCase();
    if (optnum == 2) output.value = str.substring(0, str.indexOf(" "));
    if (optnum == 3) output.value = str.substring(0, str.indexOf(" ")).length;
    if (optnum == 4)
      output.value = str.substring(str.indexOf(" ") + 1, str.lastIndexOf(" "));
    if (optnum == 5) {
      if (
        str.substring(str.length - 4) == ".jpg" ||
        str.substring(str.length - 4) == ".png"
      )
        output.value = "yes!! its file!!";
      else output.value = "no its not file...";
    }

    if (optnum == 6) {
      output.value = "";
      for (i = 0; i < str.length; i++) output.value += "*";
    }
    if (optnum == 7)
      output.value =
        str.substring(0, 2).toLowerCase() +
        str[2].toUpperCase() +
        str.substring(3).toLowerCase();
    if (optnum == 8) {
      let newstr = "";
      for (i = 0; i < str.length - 1; i++) {
        if (str[i] == " ") newstr += " " + str[i++ + 1].toUpperCase();
        else if (str[i] == "-") newstr += "-" + str[i++ + 1].toUpperCase();
        else newstr += str[i];
      }
      if (str.length - 1 == i) newstr += str[i];
      output.value = newstr;
    }

    // switch (optnum) {
    //   case 1:
    //     console.log("3");
    //     output.value = str[0].toUpperCase() + str.substring(1).toLowerCase();
    //     break;
    //   default:
    // }
  });
}
