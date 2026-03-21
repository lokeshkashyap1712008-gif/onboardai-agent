def generate_trace(resume_data, jd_data, gap, path):
    trace = []

    for skill in resume_data.get("skills", []):
        trace.append(f"Detected {skill['name']} → {skill['level']}")

    for skill in gap.get("missing", []):
        trace.append(f"Missing {skill}")

    for step in path:
        trace.append(f"Learning {step['skill']}")

    return trace