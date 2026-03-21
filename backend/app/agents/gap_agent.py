def find_skill_gap(resume_data, jd_data):
    def normalize(skill: str) -> str:
        return str(skill).strip().lower()

    resume_skills = [s["name"] for s in resume_data.get("skills", [])]
    jd_skills = jd_data.get("required_skills", [])

    resume_lookup = {normalize(skill) for skill in resume_skills if normalize(skill)}

    missing = []
    for skill in jd_skills:
        if normalize(skill) not in resume_lookup and skill not in missing:
            missing.append(skill)

    return {
        "have": resume_skills,
        "missing": missing,
    }
