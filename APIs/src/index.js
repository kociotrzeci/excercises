import "./styles.scss";

const img = document.querySelector("img");
const input = document.querySelector("input");
const button = document.querySelector("button");
button.addEventListener("click", () => {
  getImage();
});

getImage();

function getImage() {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=Mx4JFbLmysBu1d0vMQ7c3dG2akarPFO6&s=${input.value}`, //i know I shoudnt
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    });
}
