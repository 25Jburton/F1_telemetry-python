import React, { useState, useEffect } from 'react';
import TabBlock from './TabBlock'
import '../css/DropDown.css';

function SelectDropdowns() {
    const [circuit, setCircuit] = useState([]);
    const [session, setSession] = useState([]);
    const [driver, setDriver] = useState([]);
    const [yearValue, setYearValue] = useState('');
    const [circuitValue, setCircuitValue] = useState('');
    const [sessionValue, setSessionValue] = useState('');
    const [driverValue, setDriverValue] = useState('');

    useEffect(() => {
        if (yearValue) {
            fetch(`http://localhost:8000/getMeetings?year=${yearValue}`)
                .then(response => response.json())
                .then(data => setCircuit(data));
        }
    }, [yearValue]);

    useEffect(() => {
        if (circuitValue) {
            fetch(`http://localhost:8000/getSessions?year=${yearValue}&circuit_key=${circuitValue}`)
                .then(response => response.json())
                .then(data => setSession(data));
        }
    }, [yearValue,circuitValue]);

    useEffect(() => {
        if (sessionValue) {
            fetch(`http://localhost:8000/getDrivers?session_key=${sessionValue}`)
                .then(response => response.json())
                .then(data => setDriver(data));
        }
    }, [yearValue, circuitValue, sessionValue]);

    const handleSelectChangeYear = (event) => {
        setYearValue(event.target.value);
        setCircuit([]); 
        setCircuitValue('');
        setSession([]);
        setSessionValue('');
        setDriver([]);
    };

    const handleSelectChangeCircuit = (event) => {
        setCircuitValue(event.target.value);
        setSession([]);
        setSessionValue('');
        setDriver([]);
    };

    const handleSelectChangeSession = (event) => {
        setSessionValue(event.target.value);
        setDriver([]); 
        setDriverValue('');
    };

    const handleSelectChangeDriver = (event) => {
        setDriverValue(event.target.value);
    };

    return (
        <div>
            <select className='main-drop-down m-3 col-1' value={yearValue} onChange={handleSelectChangeYear}>
                <option value="" disabled>Select a Year</option>
                <option value='2023' key='1'>2023</option>
                <option value='2024' key='2'>2024</option>
                <option value='2025' key='3'>2025</option>
            </select>

            <select className='main-drop-down m-3 col-4' disabled={!yearValue} onChange={handleSelectChangeCircuit}>
                <option value="">Select a Circuit</option>
                {circuit.map((item) => (
                    <option value={item.circuit_key} data-meeting-key={item.meeting_key}>{item.circuit_short_name} | {item.meeting_name}</option>
                ))}
            </select>

            <select className='main-drop-down m-3 col-3' disabled={!circuitValue} onChange={handleSelectChangeSession}>
                <option value="">Select a Session</option>
                {session.map((item) => (
                    <option value={item.session_key}>{item.session_name} | {item.session_type}</option>
                ))}
            </select>

            <select className='main-drop-down m-3 col-3' disabled={!sessionValue} onChange={handleSelectChangeDriver}>
                <option value="">Select a Driver</option>
                {driver.map((item) => (
                    <option value={item.driver_number}>{item.driver_number} - {item.full_name}</option>
                ))}
            </select>
            <TabBlock sessionValue={sessionValue} driverValue={driverValue} />
        </div>
    );
}

export default SelectDropdowns;