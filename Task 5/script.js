

let loc = '';

let Name = document.querySelector(".name");
let DatenTime = document.querySelector(".datentime");
let Wind = document.querySelector(".wind");
let Humid = document.querySelector(".humid");
let Temp = document.querySelector(".temp")
let Mist = document.querySelector(".condition");
let image = document.querySelector(".img")
let form = document.querySelector("form");

let day = document.querySelector(".day");


const weather = async (location) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=bdfb081477194dbab6e121538253105&q=${location}&aqi=no`

    const result = await fetch(url);
    const data = await result.json();

    console.log(data);

    let locName = data.location.name;

    let time = data.location.localtime;


    let wind = data.current.wind_kph;


    let humidity = data.current.humidity;

    let condition = data.current.condition.text;

    let temp = data.current.temp_c;




    update(locName, time, wind, humidity, condition, temp);

}


const searchLocation = (e) => {
    e.preventDefault();
    loc = document.querySelector(".srch").value;

    weather(loc);

}

form.addEventListener('submit', searchLocation);

const update = (locName, time, wind, humidity, condition, temp) => {
    let datesplit = time.split(" ")[0];

    let currday = Day(new Date(datesplit).getDay());

    console.log(currday)

    Name.innerText = locName;
    DatenTime.innerText = time;
    Wind.innerText = `Wind: ${wind} kph`;
    Humid.innerText = `Humidity: ${humidity}%`;
    Temp.innerText = `${temp}°C`;
    Mist.innerText = condition;
    day.innerText = currday;

    weatherimg();

}

const Day = (currday) => {
    switch (currday) {
        case 0:
            return 'SUNDAY';
        case 1:
            return 'MONDAY';
        case 2:
            return 'TUESDAY';
        case 3:
            return 'WEDNESDAY';
        case 4:
            return 'THURSDAY';
        case 5:
            return 'FRIDAY';
        case 6:
            return 'SATURDAY';

    }
}

const weatherimg = () => {
    let conditionText = Mist.innerText.trim();

    if (conditionText === "Mist") {
        image.innerHTML = `<i class="fa-solid fa-smog"></i>`;
    } else if (conditionText === "Cloudy") {
        image.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    } else if (conditionText === "Clear") {
        image.innerHTML = `<i class="fa-solid fa-sun"></i>`;

    } else if (conditionText === "Partly Cloudy" || conditionText === "Partly cloudy" ) {
        image.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
    } else if (conditionText === "Moderate or heavy snow with thunder") {
        image.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
    } else {
        image.innerHTML = `<i class="fa-solid fa-question"></i>`;
    }
};
weather(loc);