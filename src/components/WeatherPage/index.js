import React, { useEffect, useState } from "react";

import "./WeatherPage.css";

function WeatherPage() {
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();

  const getApi = async () => {
    // const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=95210,us&appid=11d3da09cb0c13434008de6f917c6f97');
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=36.812995&lon=-119.742846&appid=11d3da09cb0c13434008de6f917c6f97"
    );
    const data = await response.json();
    console.log("RIGHT HERE", data);
    setWeather(data);
    setIcon(
      `https://openweathermap.org/img/wn/${data?.current?.weather[0].icon}@2x.png`
    );
  };

  useEffect(() => {
    getApi();
  }, []);

  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const getDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    const day = date.getDay();
    return days[day];
  };

  return (
    <>
      <div className="card">
        <span className="day">{getDay(weather?.current?.dt)}</span>
        <div className="icon">
          <img src={`${icon}`} alt="" />
        </div>
        <div className="tempsContainer">
          <div className="tempDiv">
            <span>Feels Like</span>
            {`${Math.round(
              ((weather?.current?.feels_like - 273.15) * 9) / 5 + 32
            )}°`}
          </div>
          <div className="tempDiv actual">
            <span>Actual</span>
            {`${Math.round(((weather?.current?.temp - 273.15) * 9) / 5 + 32)}°`}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherPage;
