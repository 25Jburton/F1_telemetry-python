import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WeatherBlock({sessionValue}) {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        if (sessionValue) {
            fetch(`http://localhost:8000/getSessionWeather?session_key=${sessionValue}`)
                .then(response => response.json())
                .then(data => setWeather(data[0]));
        }
    }, [sessionValue]);

    return (
    <div className="card bg-light m-3 mb-5">
        <div className="card-body mb-5">
            <h1 className='text-dark font-weight-bold'>Start of Session Weather data</h1>
            <div className='row m-3 d-flex justify-content-center'>
                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Air Temperature
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.air_temperature}
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Track Temperature
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.track_temperature}
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Wind Direction
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.wind_direction}
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                        Wind Speed
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.wind_speed}
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                        Rainfall
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.rainfall}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default WeatherBlock;