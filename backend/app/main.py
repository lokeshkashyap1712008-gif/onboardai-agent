from fastapi import FastAPI, HTTPException
from app.models.schemas import AnalyzeRequest, HistoryResponse
from app.core.orchestrator import run_pipeline
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from app.core.orchestrator__stream import run_pipeline_stream
from app.db import get_analysis, list_analyses
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for hackathon (allow all)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    return run_pipeline(data.resume, data.job_description)


@app.get("/history", response_model=HistoryResponse)
def history(limit: int = 50):
    return {"items": list_analyses(limit=limit)}


@app.get("/history/{record_id}")
def history_detail(record_id: str):
    record = get_analysis(record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return record


@app.get("/analyze-stream")
async def analyze_stream(resume: str, job_description: str):

    async def event_generator():
        async for step in run_pipeline_stream(resume, job_description):
            yield f"data: {json.dumps(step)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
