from fastapi import FastAPI
from open_f1_calls import getDrivers

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Send to the cleared out dashboard."}

@app.get("/getResults")
async def read_item(year: int = 0, driver_number: int = 1, track = '', session_key: int = 0 ):
    return getDrivers(int(driver_number), int(session_key))

""" 
    Order of function calls
    - Get the year (Pass to the meetings endpoint to get valid keys)
    return our valid meeting_name(GP), circuit_key, country_key

    - Get the location name (meeting_name(GP) selection )
    (call the sessions endpoint passing country_key & year )
    return our valid session_type/session_name
    return our valid date range for the session

    - Call the drivers endpoint with our session_key selection
    return our valid driver_number values
"""