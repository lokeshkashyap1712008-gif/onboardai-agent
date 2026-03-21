from app.utils.formatter import extract_json
from app.utils.llm import generate_text

def analyze_resume(resume: str):
    if not str(resume).strip():
        return {"skills": []}

    prompt = f"""
Extract skills and their level from the resume.

STRICT RULES:
- Use ONLY skills mentioned in the text
- DO NOT assume anything
- DO NOT default to programming skills

Return ONLY JSON:

{{
  "skills": [
    {{"name": "SkillName", "level": "Beginner/Intermediate/Advanced"}}
  ]
}}

Resume:
{resume}
"""

   

    try:
        data = extract_json(generate_text(prompt))
    except Exception:
        return {"skills": []}

    if not isinstance(data, dict):
        return {"skills": []}

    raw_skills = data.get("skills", [])
    if not isinstance(raw_skills, list):
        return {"skills": []}

    valid_levels = {"beginner", "intermediate", "advanced"}
    skills = []
    for item in raw_skills:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        level_raw = str(item.get("level", "Beginner")).strip()
        level_normalized = level_raw.lower()
        if level_normalized not in valid_levels:
            level = "Beginner"
        else:
            level = level_normalized.capitalize()
        if name:
            skills.append({"name": name, "level": level})

    return {"skills": skills}
    
