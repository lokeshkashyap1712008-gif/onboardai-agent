from app.core.pipeline import build_analysis_result


def run_pipeline(resume: str, job_description: str):
    return build_analysis_result(resume, job_description)
