from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from open_f1_calls import *

app = FastAPI()

# Enable CORS to allow requests from the React app (running on a different port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

""" 
    Order of function calls
    - Get the year (Pass to the meetings endpoint to get valid keys)
    return our valid meeting_name(GP), circuit_key, country_key

    - Get the location name (meeting_name(GP) selection)
    (call the sessions endpoint passing country_key & year )
    return our valid session_type/session_name
    return our valid date range for the session

    - Call the drivers endpoint with our session_key selection
    return our valid driver_number values
"""
@app.get("/")
async def root():
    return {"message": "Send to the cleared out dashboard."}

@app.get("/getMeetings")
async def read_item(year: int = 0 ):
    return getMeetings(int(year))

@app.get("/getSessions")
async def read_item(circuit_key: int = 0, year: int = 0 ):
    return getSessions(int(circuit_key),int(year))

@app.get("/getDrivers")
async def read_item(session_key: int = 0 ):
    return getDrivers(int(session_key))

@app.get("/getStartOfSessionDataByDriver")
async def read_item(session_key: int = 0, driver_number: int = 0):
    return getStartOfSessionDataByDriver(int(session_key), int(driver_number))

@app.get("/getCarData")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getCarData(int(session_key), int(driver_number))

@app.get("/getSessionIntervals")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionIntervals(int(session_key), int(driver_number))

@app.get("/getSessionLaps")
async def read_item(driver_number: int = 0, session_key: int = 0, lap_number: int = 0):
    return getSessionLaps(int(session_key), int(driver_number), int(lap_number))

@app.get("/getSessionLocations")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionLocations(int(session_key), int(driver_number))

@app.get("/getSessionPitStops")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionPitStops(int(session_key), int(driver_number))

@app.get("/getSessionPositions")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionPositions(int(session_key), int(driver_number))

@app.get("/getSessionRaceControl")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionRaceControl(int(session_key), int(driver_number))

@app.get("/getSessionStints")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionStints(int(session_key), int(driver_number))

@app.get("/getSessionTeamRadio")
async def read_item(driver_number: int = 0, session_key: int = 0 ):
    return getSessionTeamRadio(int(session_key), int(driver_number))

@app.get("/getSessionWeather")
async def read_item(session_key: int = 0):
    return getSessionWeather(int(session_key))