"use strict";
const DB_URL = "https://corona-57d4.restdb.io/rest/patients";
const API_KEY = "5e98bd75436377171a0c24a6";

document.querySelector("button").addEventListener("click", () => {
  const num = ("00000" + Math.floor(Math.random() * 100000)).slice(-6);
  const data = {
    num: num,
    confirmed_date: "04-15-2020",
    status: "self-quarantine",
    route: ["pizzeria"],
  };
  console.log("submitted " + data.num);
});

const form = document.querySelector("form");
const elements = form.elements;
form.setAttribute("novalidate", true);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let validForm = false;

  const formElements = form.querySelectorAll("input");
  formElements.forEach((ele) => {
    ele.classList.remove("invalid");
    if (!ele.checkValidity()) {
      ele.classList.add("invalid");
    }
  });

  const route = form.querySelector("#route");
  const route_p = form.querySelector("#route p");
  const cbs = [...form.querySelectorAll("[name='route']")];
  const checked = cbs.filter((ele) => ele.checked);
  if (checked.length > 0) {
    route.classList.remove("invalid");
    route_p.classList.add("hidden");
    validForm = true;
  } else {
    route.classList.add("invalid");
    route_p.classList.remove("hidden");
  }

  if (form.checkValidity() && validForm) {
    console.log("submitted " + elements.num.value);
  } else {
    formElements.forEach((ele) => {
      if (!ele.checkValidity()) {
        ele.classList.add("invalid");
      }
    });
    console.log("validation error!!");
  }
});

window.addEventListener("load", (e) => {
  elements.num.focus();
});
