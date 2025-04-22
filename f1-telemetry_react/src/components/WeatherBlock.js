import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Weather.css';
import temperature from '../assets/high-temperature.png';
import rain from '../assets/rain.png';
import track from '../assets/track.png';
import wind from '../assets/wind.png';
import wind_direction from '../assets/wind-direction.png';
import sun from '../assets/sun.png'

function WeatherBlock({sessionValue}) {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        if (sessionValue) {
            fetch(`http://localhost:8000/getSessionWeather?session_key=${sessionValue}`)
                .then(response => response.json())
                .then(data => setWeather(data[0]));
        }
    }, [sessionValue]);

    function getWindDirection(wind_direction){
        let direction = '';
        if(direction >= 0 && direction < 30){
            direction = 'North (N)';
        }else if(direction >= 30 && direction < 65){
            direction = 'Northeast (NE)';
        }else if(direction >= 65 && direction < 120){
            direction = 'East (E)';
        }else if(direction >= 125 && direction < 165){
            direction = 'Southeast (SE)';
        }else if(direction >= 165 && direction < 215){
            direction = 'South (S)';
        }else if(direction >= 215 && direction < 255){
            direction = 'Southwest (SW)';
        }else if(direction >= 255 && direction < 300){
            direction = 'West (W)';
        }else if(direction >= 300 && direction < 340){
            direction = 'Northwest (NW)';
        }else if(direction >= 340 && direction <= 360){
            direction = 'North (N)';
        }
        return direction;
    }

    const roundTemp = ((weather.air_temperature * 9/5) + 32).toFixed(2);
    const roundTrackTemp = ((weather.track_temperature * 9/5) + 32).toFixed(2);
    const roundWindSpeed = (weather.wind_speed * 2.2369).toFixed(2);

    return (
    <div className="card bg-light">
        <div className="card-body data-card">
            <h1 className='text-dark font-weight-bold'>Start of Session Weather data</h1>
            <div className='row m-3 d-flex justify-content-center'>
                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Air Temperature
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        <img className='weather-img' alt='temperature' src={temperature} />
                        {roundTemp}°F
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Track Temperature
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        <img className='weather-img' alt='track temperature' src={track} />
                        {roundTrackTemp}°F
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Wind Direction
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        <img className='weather-img' alt='Wind direction' src={wind_direction} />
                        {getWindDirection(weather.wind_direction)}
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                        Wind Speed
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        <img className='weather-img' alt='Track temperature' src={wind} />
                        {roundWindSpeed} MPH
                    </div>
                </div>

                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                        {weather.rainfall ? 'Rainfall' : 'Sunny' }
                        </h1>
                    </div>
                    <div className='card-body weather-value'>
                        {weather.rainfall ? <img className='weather-img' alt='Rain' src={rain} /> : <img className='weather-img' alt='Sunny' src={sun} />}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default WeatherBlock;