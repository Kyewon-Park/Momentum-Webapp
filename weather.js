//api: getting data from other server
//get data from website
//자바스크립트는 웹사이트의 refresh 없이
// 웹사이트로 request를 보내고 응답으로 데이터를 얻을 수 있다.

const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey.WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      //데이터가 다 넘어오면 그때 then에있는 함수 호출
      console.log(response); //데이터 스트림 body가 반환됨
      return response.json(); //json은 response스트림을 가져와 스트림이 완료될때까지 읽는다.
      //그리고 promise형태로 반환한다.
    })
    .then(function (json) {
      console.log(json);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //= latitude: latitude,
    longitude, //= longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("can't access");
}
function askForCoords() {
  //need api for navigator;
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords); //string to obj
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
