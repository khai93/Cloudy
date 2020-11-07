import React, { useEffect, useState } from 'react';
import DailyWeather from '../dailyWeather';

export default function DailyWeatherList(props) {
    const weatherData = props.weatherData;
    const [dailyWeatherData, setDailyWeatherData] = useState([]);
    const [listElements, setListElements] = useState([]);
    useEffect(() => {
        if (weatherData.daily) {
            console.log(weatherData);
            setListElements(weatherData.daily.map(daily => <DailyWeather key={daily.dt} data={daily}></DailyWeather>))
            setDailyWeatherData(weatherData.daily);
        }
    }, [weatherData.daily]);

    return (
        <div className="dailyWeatherList__main">
            {
                console.log(listElements),
                listElements
            }
        </div>
    )
}