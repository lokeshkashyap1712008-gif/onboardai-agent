def find_skill_gap(resume_data, jd_data):

    resume_skills = [s["name"] for s in resume_data.get("skills", [])]
    jd_skills = jd_data.get("required_skills", [])

    missing = [s for s in jd_skills if s not in resume_skills]

    return {
        "have": resume_skills,
        "missing": missing
    }