import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import "./WeatherPage.css";

function WeatherPage() {
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState();
  const lati = localStorage?.getItem("lati");
  const long = localStorage?.getItem("long");

  const getApi = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&appid=11d3da09cb0c13434008de6f917c6f97`
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
    if (!lati || !long) {
      setIsOpen(true);
    }
  }, [lati, long]);

  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const getDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    const day = date.getDay();
    return days[day];
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const submitCity = async () => {
    let cool = city?.replace(" ", "%20");
    let modded = cool.replace(",", "%2C");

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${modded}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiaGV5YXJub2xkMjMiLCJhIjoiY2t6N3hodzluMWV6bTJvcGhsaDRoZHZoYiJ9.c5nE5KuFZ7xfQZHz-tL_uA`
      // https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiaGV5YXJub2xkMjMiLCJhIjoiY2t6N3hodzluMWV6bTJvcGhsaDRoZHZoYiJ9.c5nE5KuFZ7xfQZHz-tL_uA
    );
    const data = await response.json();
    const coords = data?.features[0]?.geometry?.coordinates;
    localStorage.setItem("lati", coords[1]);
    localStorage.setItem("long", coords[0]);
    closeModal();
  };

  Modal.setAppElement("#root");

  return (
    <>
      <button onClick={openModal}>Somewhere else?</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // contentLabel="Example Modal"
        className="modal"
      >
        <div>Enter City and State</div>
        <input
          type="text"
          className="cityInput"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={submitCity}>Submit</button>
        <button onClick={closeModal}>close</button>
      </Modal>
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
