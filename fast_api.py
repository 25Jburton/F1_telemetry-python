from fastapi import FastAPI
from open_f1_calls import *

app = FastAPI()

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
    return getCarData([
        {
            'driver_number': int(driver_number),
            'session_key' : int(session_key)
        }
    ])




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