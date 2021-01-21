//Document.querySelector()는 제공한 Selector,
//또는 Selector 뭉치와 일치하는 문서 내 첫 번째 Element를 반환
//querySelectorAll은 일치하는 모든것을 array로 가져와서 쓰기 힘듬

//document도 obj다. 전체 doc을 대표하는 html을 반환함.
//DOM = document object module
//js는 html내의 모든 요소를 가지고 온다. 그러고 객체로 바꾼다.
//object는 많은 키를 가지고 있다.

// local storage
// 작은 자바스크립트 정보들을 브라우저 상에 저장함
// localStorage는 sessionStorage와 비슷하지만, localStorage의 데이터는 만료되지 않고
// sessionStorage의 데이터는 페이지 세션이 끝날 때, 즉 페이지를 닫을 때 사라지는 점이 다르다.
// HTTP(http://example.com)로 방문한 페이지에서 저장한 데이터는
// 같은 페이지의 HTTPS(https://example.com)와는 다른 localStorage에 저장된다.

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
