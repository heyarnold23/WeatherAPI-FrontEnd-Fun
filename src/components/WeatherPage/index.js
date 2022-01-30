import React, { useEffect, useState } from 'react';

import './WeatherPage.css'

function WeatherPage() {
  const [weather, setWeather] = useState();
  const [current, setCurrent] = useState();
  const [icon, setIcon] = useState();
  const [highTemp, setHighTemp] = useState();
  const [lowTemp, setLowTemp] = useState();

  const getApi = async () => {
    // const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=95210,us&appid=11d3da09cb0c13434008de6f917c6f97');
    const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=36.812995&lon=-119.742846&appid=11d3da09cb0c13434008de6f917c6f97');
    const data = await response.json();
    console.log('RIGHT HERE',data);
    setCurrent(data?.current)
    setWeather(data)
    setHighTemp(Math.round((current?.feels_like - 273.15) * 9/5 + 32) + '°')
    // setLowTemp(Math.round((data?.main?.temp_min - 273.15) * 9/5 + 32) + '°')
  }

  useEffect(() => {
    getApi();
    setIcon(`https://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`)

  }, [current?.weather[0].icon]);

  console.log(weather);
  console.log(icon)
  console.log(highTemp)


  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const day = new Date();
  const currentDay = days[day.getDay()];
  console.log(currentDay)

  return (
    <>
      <div className='card'>
        <span className='day'>
          {currentDay}
        </span>
        <div className='icon'>
          <img src={`${icon}`} alt="" />
        </div>
        <div className='temps'>
          <div className='highTemp'>
            {highTemp}
          </div>
          <div className='lowTemp'>
            {lowTemp}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherPage;
