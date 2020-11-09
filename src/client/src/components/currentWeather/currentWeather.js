import React, { useState, useEffect } from 'react';

import './currentWeather.css';

export default function CurrentWeather(props) {
    const currentWeatherData = props.currentWeatherData;

    const weatherIconElement = <img className="dailyWeather__icon" src={currentWeatherData.icon_url}></img>
    
    const temp = currentWeatherData.hasOwnProperty('temp') && Math.floor(currentWeatherData.temp.fah)
    const wind_speed = currentWeatherData.hasOwnProperty('wind_speed') && currentWeatherData.wind_speed.mph;
    return (
        <div className="currentW__main">
            <div>
                {weatherIconElement} 
                <label>{temp} &#8457;</label>
            </div>
            <div>
                <span>Humidity: {currentWeatherData.humidity_level}%</span>
                <span>Wind: {wind_speed} mph</span>
            </div>
        </div>
    )
}