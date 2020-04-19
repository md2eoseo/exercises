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
  copy.querySelector(".deleteBtn").addEventListener("click", () => {
    deleteIt(patient._id);
  });
  copy.querySelector(".editBtn").addEventListener("click", () => {
    getSinglePatient(patient);
  });

  parent.appendChild(copy);
}

function getSinglePatient(patient) {
  const template = document.querySelector("template#editForm").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector(`article[data-id="${patient._id}"]`);

  copy.querySelector("article").dataset.id = patient._id;
  copy.querySelector("#edit_num").value = patient.num;
  copy.querySelector("#edit_confirmed_date").value = patient.confirmed_date;
  copy.querySelectorAll("[name='status']").forEach((ele) => {
    if (ele.value == patient.status) {
      ele.checked = true;
    }
  });
  copy.querySelectorAll("[name='route']").forEach((ele) => {
    patient.route.forEach((el) => {
      if (ele.value == el) ele.checked = true;
    });
  });

  copy.querySelector(".saveBtn").addEventListener("click", () => {});
  copy.querySelector(".cancelBtn").addEventListener("click", () => {});

  parent.after(copy);
  document.querySelector(`article[data-id="${patient._id}"]`).remove();
}

function deleteIt(id) {
  fetch(DB_URL + "/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(`deleted ${data}`));
  document.querySelector(`article[data-id="${id}"]`).remove();
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
    .then((res) => res.json())
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
    // https://stackoverflow.com/questions/28916710/what-do-double-brackets-mean-in-javascript-and-how-to-access-them
    .then((data) => {
      showPatient(data);
      console.log(`inserted ${data} in database`);
    });
}
