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
  greeting = document.querySelector(".greeting-box"),
  greetingText = document.querySelector(".js-greetings"),
  todoCont = document.querySelector(".todo__container"),
  xbox = document.querySelector(".x-box");
const USER_LS = "currentUser", //keyName : user_localStorage
  SHOWING_CN = "showing";

function saveName(text) {
  //text : keyValue
  localStorage.setItem(USER_LS, text);
}

function handleNameSubmit(event) {
  //JS will give you the event object, so you can use it if you want to
  event.preventDefault(); //기본동작 막기(refresh같은)
  let currentValue = input.value; //input에 있는 값 저장
  paintGreeting(currentValue);
  saveName(currentValue);

  //이름 입력한 후 Write a todo 가 나타나게 함
  todoCont.classList.add(SHOWING_CN);
}

function paintForm() {
  form.classList.add(SHOWING_CN); //form을 보이게 함
  form.addEventListener("submit", handleNameSubmit); //이벤트리스너를 실행시킨다.
  //submit 이벤트가 일어나면 handleSubmit(event)
}

function setGreetingText(name) {
  //시간에 따라 인사말 달라짐
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
  greetingText.innerText = `Good ${time}, ${name}.`;
}

function paintGreeting(name) {
  form.classList.remove(SHOWING_CN); //form을 안보이게 함
  greeting.classList.add(SHOWING_CN); //greeting을 보이게 함
  xbox.classList.add(SHOWING_CN);
  setGreetingText(name); //시간에 따라 인사말 다르게 보여지게 함

  //이름 옆의 X버튼 누르면 이름 없어지고  form 나옴
  xbox.addEventListener("click", function () {
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    paintForm();
  });
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    paintForm();
  } else {
    paintGreeting(currentUser);
    //이름 입력한 후 Write a todo 가 나타나게 하는 상태 유지
    todoCont.classList.add(SHOWING_CN);
  }
}

function init() {
  loadName();
}

init();
