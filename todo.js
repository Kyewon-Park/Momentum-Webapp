const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";

const LINETHROU_CN = "lineThrough";

let toDos = []; //todo item saving container

function deleteTodo(event) {
  //html상에서 삭제
  const btn = event.target; //이벤트가 행해진 타깃
  const li = btn.parentNode; //btn의 부모인 li
  //cf) console.dir(event.target) 하면 attribute들이 쭉 나온다.
  todoList.removeChild(li);

  const cleanToDos = toDos.filter(function filterFn(todo) {
    return todo.id != li.id;
    //true를 반환하면 요소를 유지하고, false를 반환하면 버립니다.
    //Array에 filter 함수를 적용한다.
    //이 함수는 각 toDos 원소에 대해
    //li의 id와 다른 id가 있으면 포함시킨다.`
  });
  toDos = cleanToDos;
  saveTodo();
}

function paintTodo(text) {
  //queryselector 를 통해 li를 html에서 받아오지 않고 create 함.
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.addEventListener("click", deleteTodo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = `${text}   `;

  //체크박스 추가
  const chkBox = document.createElement("input");
  chkBox.type = "checkBox";
  chkBox.addEventListener("click", function makeLine(event) {
    //체크박스 클릭하면 글자 중간 관통하는 라인 생성
    let liChildren = li.children;
    liChildren[1].classList.toggle(LINETHROU_CN);
  });

  //todoList(ul) 안의 li 안의 span / btn
  li.appendChild(chkBox);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);

  const todoObj = {
    //todo item 객체
    text: text,
    id: newId,
  }; //1부터 시작
  toDos.push(todoObj); //객체 저장

  //li, btn 스타일 적용
  li.style.color = "white";
  li.style.fontSize = "25px";
  li.style.paddingBottom = "10px";
  li.style.display = "flex";
  li.style.alignItems = "center";
  span.style.marginBottom = "5px";
  span.style.padding = "0 10px";
  delBtn.style.backgroundColor = "rgba(0,0,0,0)";
  delBtn.style.border = "none";
  delBtn.style.outline = "none";
}

function saveTodo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //local storage에는 자바스크립트 데이터를 저장할 수 없고 string만 저장할 수 있다.
  //자바스크립트는 local storage 에 모든 데이터를 string으로 저장한다.
  //그냥 저장하면 [object Object]로 저장되어서 새로고침 후 쓸 수가 없다.
  //key: toDos / Value: [object Object],...
  //JSON.stringify는 자바스크립트 Obj를 string으로 바꿔준다.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  saveTodo();
  todoInput.value = "";
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos); //JSON String->Object
    //make them into javascript object
    parsedTodos.forEach(function (element) {
      paintTodo(element.text);
    });
    // forEach는 array function으로,
    // array 원소 각각에 대해 함수를 실행하는데,
    // 함수를 안에 선언할 수 있다.매개변수는 각 원소이다.
  }
}

function init() {
  loadToDos(); //load things from local storage
  todoForm.addEventListener("submit", handleSubmit); //Create Todo Form
}

init();
