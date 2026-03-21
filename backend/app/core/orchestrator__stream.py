import asyncio

from app.agents.gap_agent import find_skill_gap
from app.agents.jd_agent import analyze_jd
from app.agents.path_agent import generate_learning_path
from app.agents.resume_agent import analyze_resume
from app.core.graph_engine import SKILL_GRAPH, apply_graph_dependencies
from app.core.level_engine import apply_level_logic
from app.core.trace_engine import generate_trace
from app.db import save_analysis


async def run_pipeline_stream(resume: str, job_description: str):

    yield {"event": "step", "data": {"label": "Resume Agent", "message": "Extracting skills..."}}
    await asyncio.sleep(1)
    resume_data = analyze_resume(resume)
    yield {
        "event": "snapshot",
        "data": {
            "type": "skills",
            "skills": resume_data.get("skills", []),
        },
    }

    yield {"event": "step", "data": {"label": "JD Agent", "message": "Reading job requirements..."}}
    await asyncio.sleep(1)
    jd_data = analyze_jd(job_description)
    yield {
        "event": "snapshot",
        "data": {
            "type": "required_skills",
            "required_skills": jd_data.get("required_skills", []),
        },
    }

    yield {"event": "step", "data": {"label": "Gap Agent", "message": "Comparing skills..."}}
    await asyncio.sleep(1)
    gap = find_skill_gap(resume_data, jd_data)
    yield {
        "event": "snapshot",
        "data": {
            "type": "missing_skills",
            "missing_skills": gap["missing"],
        },
    }

    yield {"event": "step", "data": {"label": "Graph Engine", "message": "Adding dependencies..."}}
    await asyncio.sleep(1)
    graph_skills = apply_graph_dependencies(gap["missing"])
    graph_dependencies = {
        skill: SKILL_GRAPH.get(skill, [])
        for skill in gap["missing"]
        if SKILL_GRAPH.get(skill)
    }
    yield {
        "event": "snapshot",
        "data": {
            "type": "graph",
            "graph_skills": graph_skills,
            "graph_dependencies": graph_dependencies,
        },
    }

    yield {"event": "step", "data": {"label": "Level Engine", "message": "Adapting difficulty..."}}
    await asyncio.sleep(1)
    final_skills = apply_level_logic(resume_data.get("skills", []), graph_skills)
    yield {
        "event": "snapshot",
        "data": {
            "type": "gaps",
            "gaps": final_skills,
        },
    }

    yield {"event": "step", "data": {"label": "Path Agent", "message": "Generating roadmap..."}}
    await asyncio.sleep(1)
    path = generate_learning_path(final_skills) if final_skills else []
    yield {
        "event": "snapshot",
        "data": {
            "type": "roadmap",
            "roadmap": path,
        },
    }

    yield {"event": "step", "data": {"label": "Trace Engine", "message": "Explaining decisions..."}}
    await asyncio.sleep(1)
    trace = generate_trace(resume_data, jd_data, gap, path)
    yield {
        "event": "snapshot",
        "data": {
            "type": "decision_trace",
            "decision_trace": trace,
        },
    }

    analysis = {
        "resume": resume,
        "job_description": job_description,
        "skills": resume_data.get("skills", []),
        "required_skills": jd_data.get("required_skills", []),
        "missing_skills": gap["missing"],
        "graph_skills": graph_skills,
        "graph_dependencies": graph_dependencies,
        "gaps": final_skills,
        "roadmap": path,
        "decision_trace": trace,
    }

    db_status = save_analysis(analysis)

    result = {
        **analysis,
        "database": db_status,
        "saved_record": db_status.get("record"),
    }

    yield {"event": "result", "data": result}
