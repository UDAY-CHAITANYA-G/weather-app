// Date and Time
const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');
const currenWeatherItemE1=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const countryEl= document.getElementById('country');
const weatherForecastE1=document.getElementById('weather-forecast');
const currentTempEl= document.getElementById('current-temp');

const Days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

const API='49cc8c821cd2aff9af04c9f98c36eb74'; 

setInterval(() => { 
    const time= new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn24HrFormat=hour>13? hour%12:hour;
    const minutes=time.getMinutes();
    const ampm=hour >=12? 'PM':'AM' ;

    timeEl.innerHTML=(hoursIn24HrFormat <10? '0'+hoursIn24HrFormat:hoursIn24HrFormat )+ ':' + (minutes <10?'0'+minutes:minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML=Days[day]+ ','+ date+ ' '+ months[month];
},1000);

// weather


getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
    
        let {latitude,longitude} =success.coords;
        
    
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=15.6661665&lon=78.0880129&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`).then(res => res.json()).then(data=>{
            showWeatherData(data);
        })
    })
}
// 15.6661665
//  78.0880129

function showWeatherData(data){
    let {humidity,pressure,wind_speed,sunrise,sunset}=data.current;
    timezone.innerHTML=data.timezone;
    countryEl.innerHTML=data.lat +'N' + data.lon + 'E';
    currenWeatherItemE1.innerHTML = 
    `<div class="weather-items">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-items">
        <div>pressure</div>
        <div>${pressure}</div>
     </div>
    <div class="weather-items">
        <div>wind speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-items">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-items">
        <div>Sunset</div>
        <div>${window.moment(sunset *1000).format('HH:mm a')}</div>
    </div>`;

    // daily weather data
    let otherDayForcast=''
    data.daily.forEach((day,idx)=>{
        if(idx==0){
            currentTempEl.innerHTML=`
            <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
            <div class="others">
                <div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
                <div class="temp">Night- ${day.temp.night}&#176; C</div>
                <div class="temp">Day-${day.temp.day}&#176; C</div>
            </div>
            `
        }else{
            otherDayForcast +=`
            <div class="weather-forecast-items">
                <div class="day">${window.moment(day.dt *1000).format('ddd')}</div>
                <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night- ${day.temp.night}&#176; C</div>
                <div class="temp">Day- ${day.temp.day}&#176; C</div>
            </div>
            `
        }
    })

    weatherForecastE1.innerHTML=otherDayForcast;
}
