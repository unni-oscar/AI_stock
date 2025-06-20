from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

# TODO: Add authentication, database models, and API endpoints 