from app.utils.formatter import extract_json
from app.utils.llm import generate_text

def generate_learning_path(missing_skills):

    prompt = f"""
Create a learning roadmap for these skills:

{missing_skills}

Return ONLY JSON:

{{
  "roadmap": [
    {{"skill": "Python", "step": 1}},
    {{"skill": "Machine Learning", "step": 2}}
  ]
}}
"""

    try:
        data = extract_json(generate_text(prompt))
    except Exception:
        return []

    if not isinstance(data, dict):
        return []

    roadmap = data.get("roadmap", [])
    if not isinstance(roadmap, list):
        return []

    cleaned = []
    for item in roadmap:
        if not isinstance(item, dict):
            continue
        skill = str(item.get("skill", "")).strip()
        step = item.get("step")
        if not skill:
            continue
        if not isinstance(step, int):
            step = len(cleaned) + 1
        cleaned.append({"skill": skill, "step": step})

    return cleaned
