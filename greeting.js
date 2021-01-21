const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
let asf = input;
const USER_LS = "currentUser", //keyName
  SHOWING_CN = "showing";

function saveName(text) {
  //text = keyValue
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //기본동작 막기(refresh같은)
  const currentValue = input.value; //input에 있는 값 저장
  paintGreeting(currentValue);
  saveName(currentValue);
}

function paintForm() {
  form.classList.add(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN); //form을 안보이게 함
  greeting.classList.add(SHOWING_CN); //greeting을 보이게 함
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    paintForm();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
