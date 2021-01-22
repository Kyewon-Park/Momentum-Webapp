/*
local storage
작은 자바스크립트 정보들을 브라우저 상에 저장함
localStorage는 sessionStorage와 비슷하지만, localStorage의 데이터는 만료되지 않고
sessionStorage의 데이터는 페이지 세션이 끝날 때, 즉 페이지를 닫을 때 사라지는 점이 다르다.
HTTP(http://example.com)로 방문한 페이지에서 저장한 데이터는
같은 페이지의 HTTPS(https://example.com)와는 다른 localStorage에 저장된다. 
 */

//pick tags - classList / eventListner / innerText... 활용 위해

const form = document.querySelector(".js-nameForm"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", //keyName : user_localStorage
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
  form.addEventListener("submit", handleSubmit); //이벤트리스너를 실행시킨다.
  //submit 이벤트가 일어나면 handleSubmit(event)
}

function setGreetingText(name) {
  const date = new Date();
  const hr = date.getHours();
  let time = "";
  if (hr >= 18 && hr < 23) {
    time = "evening";
  } else if (hr >= 12) {
    time = "afternoon";
  } else if (hr >= 6) {
    time = "morning";
  } else {
    time = "night";
  }
  greeting.innerText = `Good ${time}, ${name}.`;
}

function paintGreeting(name) {
  form.classList.remove(SHOWING_CN); //form을 안보이게 함
  greeting.classList.add(SHOWING_CN); //greeting을 보이게 함
  setGreetingText(name);
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
