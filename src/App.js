import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherPage from "./components/WeatherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
