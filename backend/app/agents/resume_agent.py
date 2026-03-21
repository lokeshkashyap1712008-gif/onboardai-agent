from app.utils.formatter import extract_json
from app.utils.llm import generate_text

def analyze_resume(resume: str):

    prompt = f"""
Extract skills and their level from the resume.

Return ONLY JSON:

{{
  "skills": [
    {{"name": "Python", "level": "Intermediate"}}
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

    skills = []
    for item in raw_skills:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        level = str(item.get("level", "Beginner")).strip() or "Beginner"
        if name:
            skills.append({"name": name, "level": level})

    return {"skills": skills}
    
