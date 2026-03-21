from app.agents.resume_agent import analyze_resume
from app.agents.jd_agent import analyze_jd
from app.agents.gap_agent import find_skill_gap
from app.agents.path_agent import generate_learning_path

from app.core.graph_engine import apply_graph_dependencies
from app.core.level_engine import apply_level_logic
from app.core.trace_engine import generate_trace


def run_pipeline(resume: str, job_description: str):

    # STEP 1
    resume_data = analyze_resume(resume)

    # STEP 2
    jd_data = analyze_jd(job_description)

    # STEP 3
    gap = find_skill_gap(resume_data, jd_data)

    # STEP 4
    graph_skills = apply_graph_dependencies(gap["missing"])

    # STEP 5
    final_skills = apply_level_logic(
        resume_data["skills"],
        graph_skills
    )

    # STEP 6
    path = generate_learning_path(final_skills)

    # STEP 7
    trace = generate_trace(resume_data, jd_data, gap, path)

    return {
        "skills": resume_data.get("skills", []),
        "required_skills": jd_data.get("required_skills", []),
        "gaps": final_skills,
        "roadmap": path,
        "decision_trace": trace
    }