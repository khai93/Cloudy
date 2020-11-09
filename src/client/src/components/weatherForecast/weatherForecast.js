import React, {useEffect, useState} from 'react';
import CurrentWeather from '../currentWeather/';
import DailyWeatherList from '../dailyWeatherList';

import './weatherForecast.css';

export default function WeatherForecast(props) {
    const [weatherData, setWeatherData] = useState({});
    const [currentWeatherData, setCurrentWeatherData] = useState({});


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function(pos) {
            fetch(`http://localhost:8080/api/weather/current?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
                .then(res => res.json())
                .then(current => setCurrentWeatherData(current), error => alert(error))
            
            fetch(`http://localhost:8080/api/weather/forecast?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
                .then(res => res.json())
                .then(forecast => setWeatherData(forecast), error => alert(error))
    
        });
    }, []);

    const days = ['Sunday', 'Monday', "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date(Date.now());

    return (
        <div className="weatherF__main">
            <h2>Cloudy</h2>
            <h3>{days[currentDate.getDay()]} {currentDate.getHours()}:00 {currentDate.getHours() >= 12 ? 'PM' : 'AM'}</h3>
            <h3 className="weatherF__currentWeather">{currentWeatherData.description}</h3>
            <CurrentWeather currentWeatherData={currentWeatherData} />
            <DailyWeatherList weatherData={weatherData}></DailyWeatherList>
        </div>
    )
}   
