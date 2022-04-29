import React, {useState} from "react";
import Header from './Components/Header';
import './App.css';

function App () {

  const apiKey = '1308f61535a7ff6544782bf8b8fb4c85';

  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if(event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then
      (response => response.json()
      ).then(
        data => {
          setWeatherData(data);
          setCity("");
        }
      )
    }
  }

  return (
    <div className = "wrapper">

      <Header />

      <div className = "container">
        <input className = "input" 
        placeholder = "Enter a city..."
        onChange = {e =>setCity(e.target.value)}
        value = {city}
        onKeyPress = {getWeather}
        />

        {typeof weatherData.main === 'undefined' ? (
          <div>
            <br></br>
            <p>Enter city to get started</p>
          </div>
        ) : (
          <div className = "weather">
            <p>{weatherData.name}</p>
            <p><strong>{Math.round(weatherData.main.temp)} F°</strong></p>
            <p>{weatherData.weather[0].main}</p>
          </div>
        )}

        {weatherData.cod === '404' ? (
          <p className = "error">City not found. </p>
        ):(
          <>
          </>
        )}
      </div>
    </div>
  )
}

export default App;