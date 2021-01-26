//api: getting data from other server
//get data from website
//자바스크립트는 웹사이트의 refresh 없이
// 웹사이트로 request를 보내고 응답으로 데이터를 얻을 수 있다.

const COORDS = "coords";
const weather__tp = document.querySelector(".js-weather__temp");
const weather__pl = document.querySelector(".js-weather__place");
const tp__icon = document.querySelector(".js-weather__temp-icon");
const weather__img = document.querySelector(".js-weather__img");

function getWeather(lat, lon) {
  fetch(
    //fetch 로 인해 반환되는 것은 Promise로 감싸져 있는 Response 객체
    //Reponse 객체는 json 이라는 메소드를 가지고 있는데,
    //이 메소드를 실행 시켜야 비로서 우리가 원하는 데이터가 Promise 에 감싸져서 나오게 됩니다.
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey.WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      //데이터가 다 넘어오면 그때 then에있는 함수 호출
      //console.log(response); //데이터 스트림 body가 반환됨
      return response.json(); //json()은 response스트림을 가져와 스트림이 완료될때까지 읽는다.
      //그리고 body text를 JSON으로 파싱한 결과를 promise형태로 반환한다.
    })
    .then(function (json) {
      console.log(json);
      //우리가 읽는 형식의 text를 볼 수 있다.
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      weather__tp.innerText = `${temperature}   `;
      tp__icon.innerHTML = '<i class="fas fa-temperature-high"></i>';
      weather__pl.innerText = `${place}`;

      //icon
      weather__img.innerHTML =
        "<img src='http://openweathermap.org/img/wn/" +
        json.weather[0].icon +
        "@2x.png'>";
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
