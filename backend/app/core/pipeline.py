from __future__ import annotations

from typing import Any

from app.agents.gap_agent import find_skill_gap
from app.agents.jd_agent import analyze_jd
from app.agents.path_agent import generate_learning_path
from app.agents.resume_agent import analyze_resume
from app.core.graph_engine import apply_graph_dependencies, get_skill_dependencies
from app.core.level_engine import apply_level_logic
from app.core.trace_engine import generate_trace
from app.db import save_analysis


def build_analysis_result(resume: str, job_description: str) -> dict[str, Any]:
    resume_data = analyze_resume(resume)
    jd_data = analyze_jd(job_description)
    gap = find_skill_gap(resume_data, jd_data)
    graph_skills = apply_graph_dependencies(gap["missing"])
    final_skills = apply_level_logic(resume_data.get("skills", []), graph_skills)
    path = generate_learning_path(final_skills) if final_skills else []
    trace = generate_trace(resume_data, jd_data, gap, path)

    graph_dependencies = {
        skill: get_skill_dependencies(skill)
        for skill in gap["missing"]
        if get_skill_dependencies(skill)
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

    return {
        **analysis,
        "database": db_status,
        "saved_record": db_status.get("record"),
    }
