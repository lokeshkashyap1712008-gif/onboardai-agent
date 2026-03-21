from app.utils.formatter import extract_json
from app.utils.llm import generate_text

def analyze_jd(jd: str):

    prompt = f"""
Extract required skills from this job description.

Return ONLY JSON:

{{
  "required_skills": ["Python", "Machine Learning"]
}}

Job Description:
{jd}
"""

    try:
        data = extract_json(generate_text(prompt))
    except Exception:
        return {"required_skills": []}

    if not isinstance(data, dict):
        return {"required_skills": []}

    raw_required = data.get("required_skills", [])
    if not isinstance(raw_required, list):
        return {"required_skills": []}

    required_skills = [
        str(skill).strip()
        for skill in raw_required
        if str(skill).strip()
    ]

    return {"required_skills": required_skills}
