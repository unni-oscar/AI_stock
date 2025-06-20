import secrets
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (localhost:3033) to access backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3033"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

security = HTTPBasic()

# Hardcoded user credentials (for demonstration purposes)
# In a real application, these should come from a secure source
fake_username = "user"
fake_password = "password"

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, fake_username)
    correct_password = secrets.compare_digest(credentials.password, fake_password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/api/data")
def get_sample_data(username: str = Depends(get_current_username)):
    return {"stocks": [
        {"symbol": "RELIANCE", "price": 2850.5, "change": "+1.2%"},
        {"symbol": "TCS", "price": 3550.0, "change": "-0.5%"},
        {"symbol": "INFY", "price": 1450.2, "change": "+0.8%"}
    ]}

# TODO: Add authentication, database models, and more API endpoints 