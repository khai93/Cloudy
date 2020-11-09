import React, {useEffect, useState} from 'react';
import CurrentWeather from '../currentWeather/';
import DailyWeatherList from '../dailyWeatherList';

import './weatherForecast.css';

export default function WeatherForecast(props) {

    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState('imperial');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(pos) {
            fetch(`http://localhost:8080/api/weather/data?lat=${pos.coords.latitude}&long=${pos.coords.longitude}&units=${units}`)
                .then(res => res.json())
                .then((result) => {
                    setWeatherData(result);
                    console.log(result);
                }, (error) => {
                    alert("An error occured grabbing weather data.");
                })
          });
    }, []);

    return (
        <div className="weatherF__main">
            <h2>Tulsa, OK 74137</h2>
            <h3>Friday 10:00 AM</h3>
            <h3 className="weatherF__currentWeather">Sunny</h3>
            <CurrentWeather />
            <DailyWeatherList weatherData={weatherData}></DailyWeatherList>
        </div>
    )
}   
