import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import WeatherCard from "../WeatherCard";

import "./WeatherPage.css";

function WeatherPage() {
  const [current, setCurrent] = useState();
  const [week, setWeek] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(true);
  const lati = localStorage?.getItem("lati");
  const long = localStorage?.getItem("long");
  const place = localStorage?.getItem("place");

  const weatherPics = {
    200: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    300: "https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpenpsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    500: "https://wallpapercave.com/wp/Z0kmvgB.jpg",
    600: "https://ak.picdn.net/shutterstock/videos/1805984/thumb/1.jpg",
    701: "https://c1.wallpaperflare.com/preview/837/605/65/grey-sky-fog-haze.jpg",
    800: "https://wallpaperaccess.com/full/1778999.jpg",
    801: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    802: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    803: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    804: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  };

  const getApi = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&appid=11d3da09cb0c13434008de6f917c6f97`
    );
    const data = await response.json();
    setCurrent(data);
    let results = data?.daily.slice(0, 7);
    setWeek(results);
    console.log(data?.current?.weather[0]?.id);
    document.body.style.backgroundImage = `url(${
      weatherPics[data?.current?.weather[0]?.id]
    })`;
    document.body.style.backgroundSize = `cover`;
    document.body.style.backgroundRepeat = `no-repeat`;
    setLoading(false);
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
    setLoading(true);

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${modded}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiaGV5YXJub2xkMjMiLCJhIjoiY2t6N3hodzluMWV6bTJvcGhsaDRoZHZoYiJ9.c5nE5KuFZ7xfQZHz-tL_uA`
    );
    const data = await response.json();
    const coords = data?.features[0]?.geometry?.coordinates;
    localStorage.setItem("lati", coords[1]);
    localStorage.setItem("long", coords[0]);
    localStorage.setItem("place", data?.features[0]?.place_name);
    setLoading(false);
    closeModal();
  };

  Modal.setAppElement("#root");

  if (loading) {
    return <div className="modal loadingText">Loading...</div>;
  }

  return (
    <>
      <div className="locationDiv">
        <span className="place">{place}</span>
        <button className="locationButton" onClick={openModal}>
          Somewhere else?
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // contentLabel="Example Modal"
        className="modal"
      >
        <button className="closeButton" onClick={closeModal}>
          X
        </button>
        <div>Enter City and State</div>
        <input
          type="text"
          className="cityInput"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={submitCity}>Submit</button>
      </Modal>
      <div className="currentCardDiv">
        <span style={{ margin: "15px" }}>Right Now</span>
        <WeatherCard weather={current} />
      </div>
      <span className="comingWeekText">This coming week...</span>
      <div className="cardHolderDiv">
        {week?.map((item) => {
          return <WeatherCard key={item?.dt} daily={item} />;
        })}
      </div>
    </>
  );
}

export default WeatherPage;
