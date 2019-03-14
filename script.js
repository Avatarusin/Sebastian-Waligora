const apiKey = 'dd0e5915abeff8f2713e81f56690d936';

const search = document.querySelector("#navbar-search");
const inputName = document.querySelector(".navbar-box-city");
const inputUk = document.querySelector(".navbar-box-uk");
const err = document.querySelector(".alert");


function getResult(result) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputName.value},${inputUk.value}&APPID=${apiKey}&units=metric`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            showResult(result);
        });

    inputName.value = "";
    inputUk.value = "";
};

search.addEventListener("click", (e) => {
    if (inputName.value !== "" && inputUk.value !== "") {
        getResult(e);
    } else {
        showErr();
    }
});

function showResult(result) {
    console.log(result);
    switch (result.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = "url('../img/sunny.jpg')"
            break;
        case "Clouds":
            document.body.style.backgroundImage = "url('../img/clouds.jpg')"
            break;
        case "Rain":
            document.body.style.backgroundImage = "url('../img/rain.jpg')"
            break;
        case "Snow":
            document.body.style.backgroundImage = "url('../img/snow.jpg')"
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = "url('../img/storm.jpg')"
            break;

        default:
            break;
    }

    const container = document.querySelector(".container");
    const city = document.querySelector(".main-header-city");
    const desc = document.querySelector(".main-header-desc");
    const temp = document.querySelector(".main-header-temp");
    const wind = document.querySelector(".secondary-wind");
    const humidity = document.querySelector(".secondary-humidity");

    container.classList.add("active");

    city.innerHTML = result.name;

    let resultDescription = result.weather[0].description;
    desc.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temp.innerHTML = "Temperature " + Math.floor(result.main.temp) + "&#176;C";
    wind.innerHTML = "Wind: " + Math.floor(result.wind.speed) + " km/h";
    humidity.innerHTML = "Humidity: " + Math.floor(result.main.humidity) + "%";
}

function showErr() {
    err.classList.add("active");
    err.innerHTML = "Please put valid values";
    setTimeout(() => {
        err.classList.remove("active");
    }, 2000);
}