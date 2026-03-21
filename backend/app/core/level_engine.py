def apply_level_logic(resume_skills, required_skills):
    def normalize(skill: str) -> str:
        return str(skill).strip().lower()

    levels = {}
    for skill in resume_skills:
        if not isinstance(skill, dict):
            continue
        name = normalize(skill.get("name", ""))
        level = str(skill.get("level", "")).strip().lower()
        if name:
            levels[name] = level

    final = []

    for skill in required_skills:
        normalized_skill = normalize(skill)
        level = levels.get(normalized_skill)

        if level is None:
            final.append(skill)
            continue

        if level == "beginner":
            final.append(skill)

    return final
