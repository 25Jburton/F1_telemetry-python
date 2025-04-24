import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Lap.css';
import f1_flag from '../assets/f1_flag.png';
import stop_watch from '../assets/time-tracking.png';
import grid from '../assets/grid.png'
import speed_meter from '../assets/speed-meter.png'

function LapBlock({sessionValue, driverValue}) {
    const [lapCalls, setLapCalls] = useState([]);
    
    const [positionCalls, setPositionCalls] = useState([]);
    useEffect(() => {
        if (sessionValue && driverValue) {
            fetch(`http://localhost:8000/getSessionLapAndPosition?session_key=${sessionValue}&driver_number=${driverValue}`)
                .then(response => response.json())
                .then(data => setLapCalls(data));
    
            fetch(`http://localhost:8000/getSessionPositions?session_key=${sessionValue}&driver_number=${driverValue}`)
                .then(response => response.json())
                .then(data => setPositionCalls(data[0]));
        }
    }, [sessionValue, driverValue]);

    // const [position, setPosition] = useState();
    // if(positionCalls.position){
    //     setPosition(positionCalls.position);
    // }
    
    function getSegmentsSector(item){
        let result = ''
        if(!item || item===0 || item===2050 || item===2052 || item===2068){
            result =  <span class="badge bg-secondary">N/A</span>
        }else if(item===2048){
            result =  <span class="badge bg-warning">Off Personal Best</span>
        }else if(item===2049){
            result =  <span class="badge bg-success">Personal Best</span>
        }else if(item===2051){
            result =  <span class="badge" style={{ backgroundColor: 'purple' }}>Fastest Overall</span>
        }else if(item===2064){
            result =  <span class="badge bg-info">Pits</span>
        }
        return result;
    } 
    function covertSpeed(item){
        let result = item * 0.621371;
        return result.toFixed(2);
    }

    return (
    <div className="card bg-light">
        <div className="card-body data-card">
            <div className='row m-3 d-flex justify-content-center'>
                {/* Driver Radio */}
                <div className='lap-card card bg-dark text-light col-12'>
                    <div className='card-header'>
                        <h1>
                            Session Laps Times
                        </h1>
                    </div>
                    <div className='card-body audio-value row'>
                         {lapCalls[0] ? '' : 
                         <div className='col-12  rounded-4 border border-light'>
                            <img className='lap-img' alt='lap stops' src={f1_flag} />
                            No Lap Data
                         </div>
                         }
                        {lapCalls.map((item) => (
                        <div className='row d-flex justify-content-center my-3 rounded-4 border border-light'>
                            <div className='row mb-3'>
                                <div className='col-4'>
                                    <img className='lap-img' alt='lap position' src={grid} />
                                    <h3>
                                        {/* {!item.position ? '': () => setPosition(item.position)} */}
                                        Lap # {item.lap_number} <br></br>
                                        {'Starting Position '+positionCalls.position} <br></br>
                                        {/* {'Lap Position '+ position} */}
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <img className='lap-img' alt='lap stops' src={stop_watch} />
                                    <h3>Lap Time - {item.lap_duration} Seconds</h3>
                                </div>
                                <div className='col-4'>
                                    <img className='lap-img' alt='lap stops' src={speed_meter} />
                                    <h3>Speed Trap - {covertSpeed(item.st_speed)} MPH</h3>
                                    <div className='row d-flex justify-content-center'>
                                        1st Intermediate - {covertSpeed(item.i1_speed)} MPH
                                        <br></br>
                                        2nd Intermediate - {covertSpeed(item.i2_speed)} MPH
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    Sector #1 - {item.duration_sector_1}<br></br>
                                    {item.segments_sector_1.map((item) => (
                                        <p>{getSegmentsSector(item)}</p>
                                    ))}
                                </div>
                                <div className='col-3'>
                                    Sector #2 - {item.duration_sector_2} <br></br>
                                    {item.segments_sector_2.map((item) => (
                                        <p>{getSegmentsSector(item)}</p>
                                    ))}
                                </div>
                                <div className='col-3'>
                                    Sector #3 - {item.duration_sector_3} <br></br>
                                    {item.segments_sector_3.map((item) => (
                                        <p>{getSegmentsSector(item)}</p>
                                    ))}
                                </div>
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
  
  export default LapBlock;