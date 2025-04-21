import React, { useState, useEffect } from 'react';

function SelectDropdowns() {
    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options3, setOptions3] = useState([]);
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');

    useEffect(() => {
        if (selectedValue1) {
            fetch(`http://localhost:8000/getMeetings?year=${selectedValue1}`)
                .then(response => response.json())
                .then(data => setOptions1(data));
        }
    }, [selectedValue1]);

    useEffect(() => {
        if (selectedValue2) {
            fetch(`http://localhost:8000/getSessions?year=${selectedValue1}&circuit_key=${selectedValue2}`)
                .then(response => response.json())
                .then(data => setOptions2(data));
        }
    }, [selectedValue1,selectedValue2]);

    useEffect(() => {
        if (selectedValue3) {
            fetch(`http://localhost:8000/getDrivers?session_key=${selectedValue3}`)
                .then(response => response.json())
                .then(data => setOptions3(data));
        }
    }, [selectedValue1,selectedValue2, selectedValue3]);

    const handleSelectChange1 = (event) => {
        setSelectedValue1(event.target.value);
        setOptions1([]); // Clear options1 when value1 changes
    };

    const handleSelectChange2 = (event) => {
        setSelectedValue2(event.target.value);
        setOptions2([]); // Clear options1 when value1 changes
    };

    const handleSelectChange3 = (event) => {
        setSelectedValue3(event.target.value);
        setOptions3([]); // Clear options1 when value1 changes
    };

    return (
        <form>
            <select className='main-drop-down m-3' value={selectedValue1} onChange={handleSelectChange1}>
                <option value="" disabled>Select a Year</option>
                <option value='2023' key='1'>2023</option>
                <option value='2024' key='2'>2024</option>
                <option value='2025' key='3'>2025</option>
            </select>

            <select className='main-drop-down m-3' disabled={!selectedValue1} onChange={handleSelectChange2}>
                <option value="" disabled>Select a Circuit</option>
                {options1.map((item) => (
                    <option value={item.circuit_key} data-meeting-key={item.meeting_key}>{item.circuit_short_name} | {item.meeting_name}</option>
                ))}
            </select>

            <select className='main-drop-down m-3' disabled={!selectedValue2} onChange={handleSelectChange3}>
                <option value="" disabled>Select a Session</option>
                {options2.map((item) => (
                    <option value={item.session_key}>{item.session_name} | {item.session_type}</option>
                ))}
            </select>

            <select className='main-drop-down m-3' disabled={!selectedValue3}>
                <option value="" disabled>Select a Driver</option>
                {options3.map((item) => (
                    <option value={item.driver_number}>{item.driver_number} - {item.full_name}</option>
                ))}
            </select>
        </form>
    );
}

export default SelectDropdowns;