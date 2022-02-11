"use strict";
const main_container = document.querySelector("main .container");
const main = document.querySelector("main");
const app_logo = document.querySelector(".app_logo");
const API_key = "f15a0c28074220d9b6d9835f8303e0da";
const form = document.forms[0];

function startAnimation() {
  let preloader = document.createElement("div");
  preloader.classList.add("preloader");
  for (let i = 1; i < 7; i++) {
    let step = document.createElement("div");
    step.classList.add(`step${i}`);
    preloader.append(step);
  }
  main.append(preloader);
}
function breakAnimation() {
  let preloader = document.querySelector(".preloader");
  let steps = preloader.children;
  for (let elem of steps) {
    elem.remove();
  }
  preloader.remove();
}
function showPic(url, div, title) {
  let img = document.createElement("img");
  img.classList.add("movie-poster");
  img.src = url;
  img.alt = title;
  div.append(img);
}
function showText(title, overview, mark, div) {
  let nameFilm = document.createElement("div");

  nameFilm.classList.add("movie-name");
  nameFilm.textContent = title;
  div.append(nameFilm);
  let overviewFilm = document.createElement("p");
  overviewFilm.classList.add("movie-info");
  overviewFilm.textContent = overview;
  div.append(overviewFilm);
  let filmMark = document.createElement("div");
  filmMark.classList.add("movie_mark");
  if (mark < 5) {
    filmMark.style.backgroundColor = "red";
    filmMark.style.borderColor = "red";
  } else if (5 <= mark && mark <= 7) {
    filmMark.style.borderColor = "orange";
    filmMark.style.backgroundColor = "orange";
  } else {
    filmMark.style.borderColor = "green";
    filmMark.style.backgroundColor = "green";
  }
  filmMark.textContent = mark;
  div.append(filmMark);
}
function create_document_elems(data) {
  startAnimation();

  data.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("movie");
    showPic(
      `https://image.tmdb.org/t/p/w1280/${item["poster_path"]}`,
      div,
      item["original_title"]
    );
    main_container.append(div);
    showText(
      item["original_title"],
      item["overview"],
      item["vote_average"],
      div
    );
  });
  setTimeout(breakAnimation, 2000);
}
function clean_prev_res() {
  let previous_res = document.querySelectorAll(".movie");
  previous_res.forEach((elem) => {
    elem.remove();
  });
}
async function firstLoad() {
  clean_prev_res();
  let res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_key}`
  );
  let data = await res.json();
  create_document_elems(data.results);
}
firstLoad();
async function handleSearch(eventTextContent) {
  clean_prev_res();
  let res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${eventTextContent}&api_key=${API_key}`
  );
  let data = await res.json();
  create_document_elems(data.results);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(form.searchFilm.value);
});
window.onload = function () {
  startAnimation();
  setTimeout(breakAnimation, 2000);
};
app_logo.addEventListener("click", firstLoad);
