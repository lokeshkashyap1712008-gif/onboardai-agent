def apply_level_logic(resume_skills, required_skills):
    levels = {s["name"]: s["level"] for s in resume_skills}

    final = []

    for skill in required_skills:
        if skill in levels:
            if levels[skill] == "Beginner":
                final.append(skill)
            elif levels[skill] in ["Intermediate", "Advanced"]:
                continue
        else:
            final.append(skill)

    return final