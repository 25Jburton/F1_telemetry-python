from urllib.request import urlopen
import json
import datetime
currentYear = datetime.datetime.now().year

#Functions for getting the valid drop down options

# Meetings
def getMeetings(year):
    """"
        2023 - Current
        Provides a collection of all circuits used.
        A meeting refers to a Grand Prix or testing weekend and usually includes multiple sessions
        Utilized for populating the valid track options
    """
    if year >= 2023 and year <= currentYear:
        response = urlopen(f'https://api.openf1.org/v1/meetings?year={year}')
        data = json.loads(response.read().decode('utf-8'))
        return data
    else:
        return 'Missing required year param or year provided out of valid range (2023-Current)'

# Sessions
def getSessions(circuit_key, year):
    """
        Pass the circuit_key year
        A session refers to a distinct period of track activity during a Grand Prix or testing weekend (practice, qualifying, race)
    """
    if year >= 2023 and year <= currentYear:
        if circuit_key > 0:
            response = urlopen(f'https://api.openf1.org/v1/sessions?circuit_key={circuit_key}&year={year}')
            data = json.loads(response.read().decode('utf-8'))
            return data
        else:
            return 'Invalid circuit key passed'
    else:
        return 'Missing required year param or year provided out of valid range (2023-Current)'

# Drivers data
def getDrivers(session_key):
    """ 
        Returns all valid drivers provided a session_key 
        Number, Name, Team/color, Headshot, Country code 
    """
    if session_key > 0:
        response = urlopen(f'https://api.openf1.org/v1/drivers?session_key={session_key}')
        data = json.loads(response.read().decode('utf-8'))
        return data
    else:
        return 'Missing required session key param'


# Functions requiring users selection for session/driver

# Car data
def getCarData(session_key, driver_number=0):
    """ 
        Car data including rpm, drs usage, speed & throttle. 
        Takes a driver number & session key.  
        (Live data for based on date - 2/3 new records each second)
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/car_data?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/car_data?session_key={session_key}')

    car_data = json.loads(response.read().decode('utf-8'))
    return car_data

# Intervals
def getSessionIntervals(session_key, driver_number=0):
    """ 
        Fetches real-time interval data between drivers and their gap to the race leader.
        Available during races only, with updates approximately every 4 seconds.
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/intervals?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/intervals?session_key={session_key}')

    intervals_data = json.loads(response.read().decode('utf-8'))
    return intervals_data

# Laps
def getSessionLaps(session_key, driver_number=0, lap=0):
    """
        session_key driver_number lap_number
        Provides detailed information about individual laps.
    """
    if driver_number > 0 and lap > 0:
        response = urlopen(f'https://api.openf1.org/v1/laps?session_key={session_key}&driver_number={driver_number}&lap_number={lap}')
    elif driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/laps?session_key={session_key}&driver_number={driver_number}')
    elif lap > 0:
        response = urlopen(f'https://api.openf1.org/v1/laps?session_key={session_key}&lap_number={lap}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/laps?session_key={session_key}') 

    lap_data = json.loads(response.read().decode('utf-8'))
    return lap_data

# Location
def getSessionLocations(session_key, driver_number):
    """
        session_key driver_number date> & date<
        The approximate location of the cars on the circuit
    """
    response = urlopen(f'https://api.openf1.org/v1/location?session_key={session_key}&driver_number={driver_number}')
    location_data = json.loads(response.read().decode('utf-8'))
    return location_data

# Pit
def getSessionPitStops(session_key, driver_number=0):
    """
        session_key pit_duration
        Provides information about cars going through the pit lane.
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/pit?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/pit?session_key={session_key}')

    pit_data = json.loads(response.read().decode('utf-8'))
    return pit_data

# Position
def getSessionPositions(session_key, driver_number=0):
    """
        meeting_key driver_number position
        Provides driver positions throughout a session, including initial placement and subsequent changes.
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/position?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/position?session_key={session_key}')

    position_data = json.loads(response.read().decode('utf-8'))
    return position_data

# Race control
def getSessionRaceControl(session_key, driver_number=0):
    """
        flag driver_number date>= & date<
        Provides information about race control (racing incidents, flags, safety car, ...).
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/race_control?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/race_control?session_key={session_key}')

    race_control_data = json.loads(response.read().decode('utf-8'))
    return race_control_data
    
# Stints
def getSessionStints(session_key,driver_number=0):
    """
        session_key tyre_age_at_start
        A stint refers to a period of continuous driving by a driver during a session.
    """
    if driver_number > 0:
        response = urlopen(f'https://api.openf1.org/v1/stints?session_key={session_key}&driver_number={driver_number}')
    else:
        response = urlopen(f'https://api.openf1.org/v1/stints?session_key={session_key}')

    stint_data = json.loads(response.read().decode('utf-8'))
    return stint_data

# Team radio
def getSessionTeamRadio(session_key,driver_number=0):
    """
        session_key driver_number
        Provides a collection of radio exchanges between Formula 1 drivers and their respective teams during sessions
    """
    if driver_number > 0:
        """ Return all team radio calls for passed driver """
        response = urlopen(f'https://api.openf1.org/v1/team_radio?session_key={session_key}&driver_number={driver_number}')
    else:
        """ Return all team radio calls for the session """
        response = urlopen(f'https://api.openf1.org/v1/team_radio?session_key={session_key}')

    radio_data = json.loads(response.read().decode('utf-8'))
    return radio_data

# Weather
def getSessionWeather(session_key):
    """
        meeting_key wind_direction track_temperature
        The weather over the track, updated every minute.
    """
    response = urlopen(f'https://api.openf1.org/v1/weather?session_key={session_key}')
    weather_data = json.loads(response.read().decode('utf-8'))
    return weather_data

# Combined calls for start of session
def getStartOfSessionDataByDriver(session_key, driver_number):
    """ 
        Returns all valid data for the session & driver passed
        - Provides detailed information about individual laps.
        - Provides information about cars going through the pit lane.
        - Provides driver positions throughout a session, including initial placement and subsequent changes.
        - Provides information about race control (racing incidents, flags, safety car, ...).
        - Provides a collection of radio exchanges between Formula 1 drivers and their respective teams during sessions
        - The weather over the track, updated every minute.
    """
    full_data = []
    if session_key > 0:
        # Laps
        """
            Provides detailed information about individual laps.
        """
        response = urlopen(f'https://api.openf1.org/v1/laps?session_key={session_key}&driver_number={driver_number}')
        lap_data = getSessionLaps(session_key, driver_number)
        if lap_data[0]:
            full_data.append({'Lap Data': lap_data[0]})

        # Pit
        """
            Provides information about cars going through the pit lane.
        """
        response = urlopen(f'https://api.openf1.org/v1/pit?session_key={session_key}&driver_number={driver_number}')
        pit_data = getSessionPitStops(session_key, driver_number)
        full_data.append({'Pit Data': pit_data})

        # Position
        """
            Provides driver positions throughout a session, including initial placement and subsequent changes.
        """
        position_data = getSessionPositions(session_key, driver_number)
        if position_data[0]:
            full_data.append({'Position Data': position_data[0]})

        # Race control
        """
            Provides information about race control (racing incidents, flags, safety car, ...).
        """
        race_control_data = getSessionRaceControl(session_key, driver_number)
        full_data.append({'Race Control Data': race_control_data})

        # Team radio
        """
            Provides a collection of radio exchanges between Formula 1 drivers and their respective teams during sessions
        """
        radio_data = getSessionTeamRadio(session_key, driver_number)
        if radio_data[0]:
            full_data.append({'Team Radio Data': radio_data[0]})

        # Weather
        """
            The weather over the track, updated every minute.
        """
        weather_data = getSessionWeather(session_key)
        full_data.append({'Weather Data': weather_data[0]})

        # Return the combined data for the start of given session
        return full_data
    else:
        return 'Missing required session key param'
