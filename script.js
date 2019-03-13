const apiKey = 'dd0e5915abeff8f2713e81f56690d936';

const search = document.querySelector("#navbar-search");
const inputName = document.querySelector(".navbar-box-city");
const inputUk = document.querySelector(".navbar-box-uk");


function getResult(result) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputName.value},${inputUk.value}&APPID=${apiKey}&units=metric`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            showResult(result);
        });
};

search.addEventListener("click", (e) => {
    getResult(e);
});

function showResult(result) {
    console.log(result);
    const city = document.querySelector(".main-header-city");
    const desc = document.querySelector(".main-header-desc");
    const temp = document.querySelector(".main-header-temp");
    const wind = document.querySelector(".secondary-wind");
    const humidity = document.querySelector(".secondary-humidity");



    city.innerHTML = (result.name).toUpperCase();
    desc.innerHTML = result.weather[0].description;

    temp.innerText = "Temperature " + Math.floor(result.main.temp) + " C";
    wind.innerHTML = "Wind: " + Math.floor(result.wind.speed) + " km/h";
}