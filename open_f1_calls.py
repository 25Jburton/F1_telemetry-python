from urllib.request import urlopen
import json
import datetime
currentYear = datetime.datetime.now().year
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
        lap_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Lap Data': lap_data[0]})

        # Pit
        """
            Provides information about cars going through the pit lane.
        """
        response = urlopen(f'https://api.openf1.org/v1/pit?session_key={session_key}&driver_number={driver_number}')
        pit_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Pit Data': pit_data})

        # Position
        """
            Provides driver positions throughout a session, including initial placement and subsequent changes.
        """
        response = urlopen(f'https://api.openf1.org/v1/position?session_key={session_key}&driver_number={driver_number}')
        position_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Position Data': position_data[0]})

        # Race control
        """
            Provides information about race control (racing incidents, flags, safety car, ...).
        """
        response = urlopen(f'https://api.openf1.org/v1/race_control?session_key={session_key}&driver_number={driver_number}')
        race_control_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Race Control Data': race_control_data})

        # Team radio
        """
            Provides a collection of radio exchanges between Formula 1 drivers and their respective teams during sessions
        """
        response = urlopen(f'https://api.openf1.org/v1/team_radio?session_key={session_key}&driver_number={driver_number}')
        radio_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Team Radio Data': radio_data[0]})

        # Weather
        """
            The weather over the track, updated every minute.
        """
        response = urlopen(f'https://api.openf1.org/v1/weather?session_key={session_key}')
        weather_data = json.loads(response.read().decode('utf-8'))
        full_data.append({'Weather Data': weather_data[0]})

        return full_data
    else:
        return 'Missing required session key param'

# Car data
def getCarData(params_list):
    """ 
        Car data including rpm, drs usage, speed & throttle. 
        Takes a driver number & session key.  
        (Live data for based on date - 2/3 new records each second)
    """
    dN = 'driver_number'
    sK = 'session_key'
    argument_string = ''

    dNV = [param.get(dN) for param in params_list if dN in param]
    if dNV:
        dNV = dN+ '=' +''.join(str(dNV[0]))+'&'
        argument_string += dNV
    else:
         return 'Driver Number parameter is required.'

    sKV = [param.get(sK) for param in params_list if sK in param]
    if sKV:
        sKV = sK+ '=' +''.join(str(sKV[0]))+'&'
        argument_string += sKV

        response = urlopen(f'https://api.openf1.org/v1/car_data?{argument_string}')
        data = json.loads(response.read().decode('utf-8'))
        return(data)
    else:
        return 'Session key parameter is required.'

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