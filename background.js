const body = document.querySelector("body");

const ImageCount = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function generateRandom() {
  //자바스크립트에는 Math 모듈이 있음
  const number = Math.floor(Math.random() * 3);
  return number;
}

function init() {
  const randomNumber = generateRandom();
  paintImage(randomNumber);
}

init();
