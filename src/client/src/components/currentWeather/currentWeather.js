import React from 'react';

import './currentWeather.css';

export default function CurrentWeather(props) {
    const degreeSymbol = props.degreeSymbol || <span> &#8457; </span>;
    const weatherIcon = props.weatherIcon || '10d';

    const weatherIconElement = <img className="currentW__weatherIcon" src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
    return (
        <div className="currentW__main">
            <div>
                {weatherIconElement} 
                <label>52 { degreeSymbol }</label>
            </div>
            <div>
                <span>Precipitation: 2%</span>
                <span>Humidity: 74%</span>
                <span>Wind: 9%</span>
            </div>
        </div>
    )
}