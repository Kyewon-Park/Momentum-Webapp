//Document.querySelector()는 제공한 Selector
//또는 Selector 뭉치와 일치하는 문서 내 첫 번째 Element를 반환

//document도 obj다. 전체 doc을 대표하는 html을 반환함.
//DOM = document object module
//js는 html내의 모든 요소를 가지고 온다. 그러고 객체로 바꾼다.
//object는 많은 키를 가지고 있다.

const clockContainer = document.querySelector(".js-clock"),
  //looks for children of the 'doc'(element)
  clockTitle = clockContainer.querySelector("h1");
//looks for children of the 'js-clock'(element)
//const가 둘다 적용된 상태

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  //백틱 기호 사용
}

//ternary operations ( mini if )

function init() {
  getTime();
  setInterval(getTime, 1000);
  //setInterval() function: takes 2 arg
  //first arg: function, second arg: wait time to execute again(ms)
}

init();
