"use strict";
const DB_URL = "https://corona-57d4.restdb.io/rest/patients";
const API_KEY = "5e98bd75436377171a0c24a6";

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
    post({
      num: elements.num.value,
      confirmed_date: elements.confirmed_date.value,
      status: elements.status.value,
      route: checked.map((ele) => ele.value),
    });
    console.log("submitted " + elements.num.value);
    form.reset();
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
  get();
});

function showPatients(patients) {
  patients.forEach(showPatient);
}

function showPatient(patient) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector("main");

  // Error: when we add new patient, we can only get undefined _id before the record really inserted in database.
  copy.querySelector("article").dataset.id = patient._id;
  copy.querySelector("#num").textContent = patient.num;
  copy.querySelector("#confirmed_date").textContent =
    " - Confirmed on " + patient.confirmed_date.slice(0, 10);
  copy.querySelector("#status").textContent = patient.status;
  copy.querySelector("#route").textContent = patient.route;

  // Error: when we add new patient, we can only get undefined _id before the record really inserted in database.
  // copy.querySelector(".deleteBtn").addEventListener("click", () => {
  //   deleteIt(patient._id);
  // });
  // copy.querySelector(".updateBtn").addEventListener("click", () => {
  //   put(patient._id);
  // });

  parent.appendChild(copy);
}

function get() {
  document.querySelector("main").innerHTML = "";
  fetch(DB_URL, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showPatients);
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch(DB_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then(console.log(`inserted ${postData} in database`));
}
