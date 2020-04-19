"use strict";
const DB_URL = "https://corona-57d4.restdb.io/rest/patients";
const API_KEY = "5e98bd75436377171a0c24a6";

const form = document.querySelector("#postForm");
const elements = form.elements;
form.addEventListener("submit", (e) => {
  form.setAttribute("novalidate", true);
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

  copy.querySelector("article").dataset.id = patient._id;
  copy.querySelector("#num").textContent = patient.num;
  copy.querySelector("#confirmed_date").textContent =
    " - Confirmed on " + patient.confirmed_date.slice(0, 10);
  copy.querySelector("#status").textContent = patient.status;
  copy.querySelector("#route").textContent = patient.route;

  copy.querySelector(".deleteBtn").addEventListener("click", () => {
    deleteIt(patient._id);
  });
  copy.querySelector(".editBtn").addEventListener("click", () => {
    showEditForm(patient);
  });

  parent.appendChild(copy);
}

function showEditForm(patient) {
  const template = document.querySelector("template#editForm").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector(`article[data-id="${patient._id}"]`);
  parent.style.display = "none";

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

  copy.querySelector(".saveBtn").addEventListener("click", (e) => {
    const form = document.querySelector(
      `.editForm[data-id="${patient._id}"] form`
    );
    const elements = form.elements;
    form.setAttribute("novalidate", true);

    e.preventDefault();
    let validForm = false;

    const formElements = form.querySelectorAll("input");
    formElements.forEach((ele) => {
      ele.classList.remove("invalid");
      if (!ele.checkValidity()) {
        ele.classList.add("invalid");
      }
    });

    const route = form.querySelector("#edit_route");
    const route_p = form.querySelector("#edit_route p");
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
    console.log(elements);

    if (form.checkValidity() && validForm) {
      put(
        {
          num: elements.num.value,
          confirmed_date: elements.confirmed_date.value,
          status: elements.status.value,
          route: checked.map((ele) => ele.value),
        },
        patient._id
      );
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
  copy.querySelector(".cancelBtn").addEventListener("click", () => {
    parent.style.display = "block";
    document
      .querySelector(`article.editForm[data-id="${patient._id}"]`)
      .remove();
  });

  parent.after(copy);
}

function put(data, id) {
  const postData = JSON.stringify(data);
  fetch(DB_URL + "/" + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then(get);
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
