import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RadioRaceControl.css';

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

    const formatDate = (dateString, format = "YYYY-MM-DD") => {
        const date = new Date(dateString);
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
      
        const formatMap = {
          'YYYY-MM-DD': `${year}-${month}-${day}`,
          'DD-MM-YYYY': `${day}-${month}-${year}`,
          'MM-DD-YYYY': `${month}-${day}-${year}`,
          'YYYY/MM/DD': `${year}/${month}/${day}`,
          'DD/MM/YYYY': `${day}/${month}/${year}`,
          'MM/DD/YYYY': `${month}/${day}/${year}`,
          // Add other formats as needed
        };
      
        return formatMap[format] || "Invalid Format";
    };

    const formatTime = (dateString) => {
        let formatedDate = dateString.split("T");
        formatedDate = formatedDate[1].split(".");
        formatedDate = formatedDate[0];

        return formatedDate;
    }

    return (
    <div className="card bg-light">
        <div className="card-body data-card">
            <h1 className='text-dark font-weight-bold'>Driver Radio & Race Control Flags</h1>
            <div className='row m-3 d-flex justify-content-center'>
                {/* Driver Radio */}
                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Team Radio Calls
                        </h1>
                    </div>
                    <div className='card-body audio-value'>
                        {radioCalls.map((item) => (
                            <div>
                                <h3>{formatTime(item.date)}</h3>
                                <AudioPlayer src={item.recording_url} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Race Control Flags */}
                <div className='card m-2 bg-dark text-light font-weight-bold col-lg-5 col-md-12'>
                    <div className='card-header'>
                        <h1>
                            Race Control Flags
                        </h1>
                    </div>
                    <div className='card-body raceControl-value'>
                        {raceControl.map((item) => (
                            <h3>{item.flag} | {item.message}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default RadioBlock;