"use strict";
window.addEventListener("DOMContentLoaded", start);
const num = [];
let counter = 0;
function start() {
  if (num.length < 9) num.unshift(counter++);
  else {
    num.unshift(counter++);
    num.pop();
  }

  // result = people.push("Draco");
  // result = people.pop();
  // result = people.push("Neville");
  // result = people.push("Luna");
  // result = people.slice(0, 3);
  // result = people.splice(1, 0, "Cho");
  // people[1] = "Ginny";
  // result = people.push("Fred", "George");
  // result = people.indexOf("Fred");
  // result = people.splice(result, 1);
  // result = people.unshift("asdf", "efef");

  // const str = "asdfqwerzdxvc";
  // const ss = str.split();

  // console.log(ss);
  // console.log(result);
  // console.log(people);
  console.log(num);
  setTimeout(start, 500);
}
