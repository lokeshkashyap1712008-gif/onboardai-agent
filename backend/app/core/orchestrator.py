def run_pipeline(resume: str, job_description: str):
    return {
        "status": "pipeline working",
        "resume_length": len(resume),
        "jd_length": len(job_description)
    }