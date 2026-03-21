def generate_trace(resume_data, jd_data, gap, path):
    trace = []
    missing_lookup = {
        str(skill).strip().lower()
        for skill in gap.get("missing", [])
        if str(skill).strip()
    }

    for skill in resume_data.get("skills", []):
        trace.append(f"Detected {skill['name']} -> {skill['level']}")

    for skill in gap.get("missing", []):
        trace.append(f"Missing {skill}")

    for step in path:
        skill_name = str(step.get("skill", "")).strip()
        if skill_name and skill_name.lower() in missing_lookup:
            trace.append(f"Learning {skill_name}")

    return trace
