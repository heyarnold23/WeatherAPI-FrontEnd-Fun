import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import WeatherCard from "../WeatherCard";

import "./WeatherPage.css";

function WeatherPage() {
  const [current, setCurrent] = useState();
  const [week, setWeek] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState();
  const lati = localStorage?.getItem("lati");
  const long = localStorage?.getItem("long");
  const place = localStorage?.getItem("place");

  const getApi = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&appid=11d3da09cb0c13434008de6f917c6f97`
    );
    const data = await response.json();
    setCurrent(data);
    setWeek(data?.daily);
  };

  useEffect(() => {
    getApi();
    if (!lati || !long) {
      setIsOpen(true);
    }
  }, [lati, long]);

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
    );
    const data = await response.json();
    const coords = data?.features[0]?.geometry?.coordinates;
    localStorage.setItem("lati", coords[1]);
    localStorage.setItem("long", coords[0]);
    localStorage.setItem("place", data?.features[0]?.place_name);
    closeModal();
  };

  Modal.setAppElement("#root");

  return (
    <>
      <div className="place">{place}</div>
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
      <WeatherCard weather={current}/>
      {week?.map((item) => {
        return (
          <WeatherCard daily={item} />
        );
      })};

    </>
  );
}

export default WeatherPage;
