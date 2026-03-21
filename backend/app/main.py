from fastapi import FastAPI
from app.models.schemas import AnalyzeRequest
from app.core.orchestrator import run_pipeline
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from app.core.orchestrator__stream import run_pipeline_stream
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
@app.get("/analyze-stream")
async def analyze_stream(resume: str, job_description: str):

    async def event_generator():
        async for step in run_pipeline_stream(resume, job_description):
            yield f"data: {json.dumps(step)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")