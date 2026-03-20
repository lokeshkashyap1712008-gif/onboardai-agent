from fastapi import FastAPI
from app.models.schemas import AnalyzeRequest
from app.core.orchestrator import run_pipeline

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    return run_pipeline(data.resume, data.job_description)