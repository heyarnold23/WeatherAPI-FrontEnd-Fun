import React, { useEffect, useState } from 'react';

// api key 11d3da09cb0c13434008de6f917c6f97


function App() {
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();
  const [highTemp, setHighTemp] = useState();
  const [lowTemp, setLowTemp] = useState();




  const getApi = async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=95210,us&appid=11d3da09cb0c13434008de6f917c6f97');
    const data = await response.json();
    console.log(data);
    setWeather(data.weather[0])
    setHighTemp(Math.round((data?.main?.temp_max - 273.15) * 9/5 + 32) + '°')
    setLowTemp(Math.round((data?.main?.temp_min - 273.15) * 9/5 + 32) + '°')
  }

  useEffect(() => {
    getApi();
    setIcon(`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`)

  }, [weather?.icon]);

  console.log(weather);
  console.log(icon)
  console.log(highTemp)


  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const day = new Date();
  const currentDay = days[day.getDay()];
  console.log(currentDay)

  return (
    <>
      <div id='card'>
        <span id='day'>
          {currentDay}
        </span>
        <div id='icon'>
          <img src={`${icon}`} alt="" />
        </div>
        <div id='temps'>
          <div id='highTemp'>
            {highTemp}
          </div>
          <div id='lowTemp'>
            {lowTemp}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
