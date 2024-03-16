import "./styles.scss";

const img = document.querySelector("img");
const input = document.querySelector("input");
const button = document.querySelector("button");
button.addEventListener("click", () => {
  getImageAsync();
});

getImageAsync();

async function getImageAsync() {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=Mx4JFbLmysBu1d0vMQ7c3dG2akarPFO6&s=${input.value}`, //i know I shoudnt
    { mode: "cors" }
  );
  const json = await response.json();
  img.src = json.data.images.original.url;
}
