"use strict";
window.addEventListener("DOMContentLoaded", start);

const DB_URL = "https://frontendspring20-a0df.restdb.io/rest/singers";
const API_KEY = "5e9571e8436377171a0c2321";
const query = "";

function start() {
  document.querySelector("button").addEventListener("click", () => {
    const data = {
      name: "Jonas" + Math.random(),
      num_of_members: 1,
      date_of_debut: "2000-09-01",
    };
    post(data);
  });

  get();
}

function showSingers(data) {
  data.forEach(showSinger);
}

function showSinger(singer) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector("main");

  // Error: when we add new singer, we can only get undefined _id before the record really inserted in database.
  copy.querySelector("article").dataset.id = singer._id;
  copy.querySelector("#name").textContent = singer.name;
  copy.querySelector("#date_of_debut").textContent =
    " - Debut on " + singer.date_of_debut.slice(0, 10);
  copy.querySelector("#num_of_members").textContent =
    singer.num_of_members == 1
      ? " - single"
      : " - " + singer.num_of_members + " members";

  // Error: when we add new singer, we can only get undefined _id before the record really inserted in database.
  copy.querySelector(".deleteBtn").addEventListener("click", () => {
    deleteIt(singer._id);
  });
  copy.querySelector(".updateBtn").addEventListener("click", () => {
    put(singer._id);
  });

  parent.appendChild(copy);
}

function get() {
  document.querySelector("main").innerHTML = "";
  fetch(DB_URL + query, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showSingers);
}

function post(data) {
  showSinger(data);
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
    .then(console.log(`inserted ${postData}`));
}

function deleteIt(id) {
  document.querySelector(`article[data-id="${id}"]`).remove();
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
}

function put(id) {
  const data = {
    name: "Jonas",
    num_of_members: 22,
    date_of_debut: "2222-02-22",
  };
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
