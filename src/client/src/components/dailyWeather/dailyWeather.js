import React from 'react';

import './dailyWeather.css'

export default function DailyWeather(props) {
    const dailyData = props.data;

    const weatherTime = new Date(dailyData.date);
    const weatherTempFah = (dailyData.temp.max.fah + dailyData.temp.min.fah) / 2;
    const weatherTempCel = (dailyData.temp.max.cel + dailyData.temp.min.cel) / 2;
    const currentTimeFrame = dailyData.time_frames.reduce((prev, curr) => {
        const now = Date.now();   
        const timeframeDate = new Date(curr.date);
        const prevDate = new Date(prev);

        if ((timeframeDate.getTime() - now) > (prevDate.getTime() - now)) {
            return prevDate;
        }
        return curr;
    }, {});


    const weatherIcon = currentTimeFrame.icon_url;


    const weatherIconElement = <img className="dailyWeather__icon" src={weatherIcon}></img>
  
    return (
        <div className="dailyWeather__main">
            <label className="dailyWeather__day">{weatherTime.getDay()}</label>
            {weatherIconElement}
            <label className="dailyWeather__temp">{weatherTempFah} &#176;</label>
            <label className="dailyWeather__feelsLike">{weatherTempCel} &#176;</label>
        </div>
    )
} 