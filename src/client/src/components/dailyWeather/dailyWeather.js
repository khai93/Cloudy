import React from 'react';

import './dailyWeather.css'

export default function DailyWeather(props) {
    const dailyData = props.data;

    console.log(dailyData);

    const weatherTime = new Date(dailyData.dt);
    console.log(weatherTime);
    const weatherTemp = dailyData.temp.day;
    const weatherFeelsLike = dailyData.feels_like.day;
    const weatherIcon = dailyData.weather.icon || '10d';

    const weatherIconElement = <img className="dailyWeather__icon" src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
  
    return (
        <div className="dailyWeather__main">
            <label className="dailyWeather__day">{weatherTime.getDay()}</label>
            {weatherIconElement}
            <label className="dailyWeather__temp">{weatherTemp} &#176;</label>
            <label className="dailyWeather__feelsLike">{weatherFeelsLike} &#176;</label>
        </div>
    )
} 