import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RadioRaceControl.css';
import audio from '../assets/audio-waves.png'
import f1_flag from '../assets/f1_flag.png'

function RadioBlock({sessionValue, driverValue}) {
    const [radioCalls, setRadioCalls] = useState([]);
    const [raceControl, setRaceControl] = useState([]);

    useEffect(() => {
        if (sessionValue && driverValue) {
            fetch(`http://localhost:8000/getSessionTeamRadio?session_key=${sessionValue}&driver_number=${driverValue}`)
                .then(response => response.json())
                .then(data => setRadioCalls(data));
        }
    }, [sessionValue, driverValue]);

    useEffect(() => {
        if (sessionValue && driverValue) {
            fetch(`http://localhost:8000/getSessionRaceControl?session_key=${sessionValue}&driver_number=${driverValue}`)
                .then(response => response.json())
                .then(data => setRaceControl(data));
        }
    }, [sessionValue, driverValue]);

    const formatTime = (dateString) => {
        let formatedDate = dateString.split("T");
        formatedDate = formatedDate[1].split(".");
        formatedDate = formatedDate[0];

        return formatedDate;
    }

    return (
    <div className="card bg-light">
        <div className="card-body data-card">
            <div className='row m-3 d-flex justify-content-center'>
                {/* Driver Radio */}
                <div className='audio-card card bg-dark text-light col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Team Radio Calls 
                        </h1>
                    </div>
                    <div className='card-body audio-value row'>
                         {radioCalls[0] ? '' : 
                         <div className='col-12  rounded-4 border border-light'>
                            <img className='audio-img' alt='audio' src={audio} />
                            No Radio Calls
                         </div>
                         }
                        {radioCalls.map((item) => (
                            <div className='col-12 my-3 rounded-4 border border-light'>
                                <img className='audio-img' alt='audio' src={audio} />
                                <h3>{formatTime(item.date)}</h3>
                                <AudioPlayer src={item.recording_url} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Race Control Flags */}
                <div className='race-control-card card bg-dark text-light col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Race Control Flags
                            <img className='flag-img rounded-4' alt='Race Control' src={f1_flag} />
                        </h1>
                    </div>
                    <div className='card-body raceControl-value'>
                        {raceControl[0] ? '': 
                         <div className='col-12  rounded-4 border border-light'>
                            No Flags
                         </div>
                         }
                        <ol>
                            {raceControl.map((item) => (
                                <li>{item.message}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default RadioBlock;