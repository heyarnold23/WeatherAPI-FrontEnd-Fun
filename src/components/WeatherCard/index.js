import "./WeatherCard.css";

export default function WeatherCard({ weather, daily }) {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const getDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    return days[day];
  };


  if (daily) {
      return(
    <div className="card">
      <span className="day">{getDay(daily?.dt)}</span>
      <div className="icon">
        <img src={`https://openweathermap.org/img/wn/${daily?.weather[0]?.icon}@2x.png`} alt="" />
      </div>
      <div className="tempsContainer">
        <div className="tempDiv">
          <span>Day</span>
          {`${Math.round(((daily?.temp?.max - 273.15) * 9) / 5 + 32)}°`}
        </div>
        <div className="tempDiv actual">
          <span>Night</span>
          {`${Math.round(((daily?.temp?.min - 273.15) * 9) / 5 + 32)}°`}
        </div>
      </div>
        </div>
      )
  }

  return (
    <div className="card">
      <span className="day">{getDay(weather?.current?.dt)}</span>
      <div className="icon">
        <img src={`https://openweathermap.org/img/wn/${weather?.current?.weather[0].icon}@2x.png`} alt="" />
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
  );
}
