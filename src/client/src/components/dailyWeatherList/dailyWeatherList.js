import React, { useEffect, useState } from 'react';
import DailyWeather from '../dailyWeather';

import './dailyWeatherList.css'

export default function DailyWeatherList(props) {
    const weatherData = props.weatherData;
    const [dailyWeatherData, setDailyWeatherData] = useState([]);
    const [listElements, setListElements] = useState([]);
    useEffect(() => {
        if (weatherData.days) {
            setListElements(weatherData.days.map(day => <DailyWeather key={day.date} data={day}></DailyWeather>))
            setDailyWeatherData(weatherData.days);
        }
    }, [weatherData.days]);

    return (
        <div className="dailyWeatherList__main">
            {
                console.log(listElements),
                listElements
            }
        </div>
    )
}