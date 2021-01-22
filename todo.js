const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";

function paintTodo(text) {}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    //todo 가 있다면
  }
}

function init() {
  loadToDos(); //load things from local storage
  todoForm.addEventListener("submit", handleSubmit); //Create Todo Form
}

init();
