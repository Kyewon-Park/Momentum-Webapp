const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", //keyName
  SHOWING_CN = "showing";

function saveName(text) {
  //text : keyValue
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //JS will give you the event object, so you can use it if you want to
  event.preventDefault(); //기본동작 막기(refresh같은)
  const currentValue = input.value; //input에 있는 값 저장
  paintGreeting(currentValue);
  saveName(currentValue);
}

function paintForm() {
  form.classList.add(SHOWING_CN); //form을 보이게 함
  greeting.classList.remove(SHOWING_CN); //greeting을 안보이게 함
  form.addEventListener("submit", handleSubmit); //이벤트리스너를 실행시킨다.
  //submit 이벤트가 일어나면 handleSubmit(event)
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
