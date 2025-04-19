from urllib.request import urlopen
import json

def getDrivers(driver_number,session_key):
    if session_key > 0:
            response = urlopen(f'https://api.openf1.org/v1/drivers?driver_number={driver_number}&session_key={session_key}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/drivers?driver_number={driver_number}')
    data = json.loads(response.read().decode('utf-8'))
    return data


# Car data
""" 
    driver_number session_key speed 
    Some data about each car
"""

# Drivers data
""" 
    driver_number session_key 
    Provides information about drivers for each session.
"""

# Intervals
""" 
    session_key=9165&interval<0.005 
    Fetches real-time interval data between drivers and their gap to the race leader.
    Available during races only, with updates approximately every 4 seconds.
"""

# Laps
"""
    session_key driver_number lap_number
    Provides detailed information about individual laps.
"""

# Location
"""
    session_key driver_number date> & date<
    The approximate location of the cars on the circuit
"""

# Meetings
""""
    year=2023 country_name
    Provides information about meetings.
    A meeting refers to a Grand Prix or testing weekend and usually includes multiple sessions
"""

# Pit
"""
    session_key pit_duration
    Provides information about cars going through the pit lane.
"""

# Position
"""
    meeting_key driver_number position
    Provides driver positions throughout a session, including initial placement and subsequent changes.
"""

# Race control
"""
    flag driver_number date>= & date<
    Provides information about race control (racing incidents, flags, safety car, ...).
"""

# Sessions
"""
    country_name session_name year
    A session refers to a distinct period of track activity during a Grand Prix or testing weekend (practice, qualifying
"""

# Stints
"""
    session_key tyre_age_at_start
    A stint refers to a period of continuous driving by a driver during a session.
"""

# Team radio
"""
    session_key driver_number
    Provides a collection of radio exchanges between Formula 1 drivers and their respective teams during sessions
"""

# Weather
"""
    meeting_key wind_direction track_temperature
    The weather over the track, updated every minute.
"""