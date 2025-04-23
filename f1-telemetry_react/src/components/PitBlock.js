import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pit.css';
import f1_flag from '../assets/f1_flag.png';
import stop_watch from '../assets/time-tracking.png';
import pit_stop from '../assets/pit-stop.png'

function PitBlock({sessionValue, driverValue}) {
    const [pitCalls, setPitCalls] = useState([]);

    useEffect(() => {
        if (sessionValue && driverValue) {
            fetch(`http://localhost:8000/getSessionPitStops?session_key=${sessionValue}&driver_number=${driverValue}`)
                .then(response => response.json())
                .then(data => setPitCalls(data));
        }
    }, [sessionValue, driverValue]);

    return (
    <div className="card bg-light">
        <div className="card-body data-card">
            <div className='row m-3 d-flex justify-content-center'>
                {/* Driver Radio */}
                <div className='pit-card card bg-dark text-light col-12'>
                    <div className='card-header'>
                        <h1>
                            Session Pit Stops 
                        </h1>
                    </div>
                    <div className='card-body audio-value row'>
                         {pitCalls[0] ? '' : 
                         <div className='col-12  rounded-4 border border-light'>
                            <img className='pit-img' alt='pit stops' src={f1_flag} />
                            No Pit Stops
                         </div>
                         }
                        {pitCalls.map((item) => (
                        <div className='row d-flex justify-content-center my-3 rounded-4 border border-light'>
                            <div className='col-6'>
                                <img className='pit-img' alt='pit stops' src={pit_stop} />
                                <h3>Lap #{item.lap_number}</h3>
                            </div>
                            <div className='col-6'>
                                <img className='pit-img' alt='pit stops' src={stop_watch} />
                                <h3>{item.pit_duration} Seconds</h3>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default PitBlock;