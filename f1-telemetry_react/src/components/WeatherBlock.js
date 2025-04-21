import React, { useState, useEffect } from 'react';

function WeatherBlock({sessionValue}) {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        if (sessionValue) {
            fetch(`http://localhost:8000/getSessionWeather?session_key=${sessionValue}`)
                .then(response => response.json())
                .then(data => setWeather(data));
        }
    }, [sessionValue]);

    return (
      <div className="card">
        <div className="card-body">
            Weather data
            <ul>
                {weather.map((item) => (
                    <ul>
                        <li value={item.air_temperature}>
                            Air Temperature - {item.air_temperature}
                        </li>
                        <li value={item.air_temperature}>
                            Humidity - {item.humidity}
                        </li>
                        <li value={item.air_temperature}>
                            Pressure - {item.pressure}
                        </li>
                        <li value={item.air_temperature}>
                            Rainfall - {item.rainfall}
                        </li>
                        <li value={item.air_temperature}>
                            Track Temperature - {item.track_temperature}
                        </li>
                        <li value={item.air_temperature}>
                            Wind Direction - {item.wind_direction}
                        </li>
                        <li value={item.air_temperature}>
                            Wind Speed - {item.wind_speed}
                        </li>
                    </ul>
                ))}
            </ul>
        </div>
      </div>
    );
  }
  
  export default WeatherBlock;