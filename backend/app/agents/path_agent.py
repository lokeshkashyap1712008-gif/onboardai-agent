import json

from app.utils.formatter import extract_json
from app.utils.llm import generate_text


def generate_learning_path(missing_skills):
    def normalize(skill: str) -> str:
        return str(skill).strip().lower()

    if not isinstance(missing_skills, list):
        return []

    cleaned_missing = [str(skill).strip() for skill in missing_skills if str(skill).strip()]
    if not cleaned_missing:
        return []

    allowed_skills = {normalize(skill) for skill in cleaned_missing}
    skills_json = json.dumps(cleaned_missing, ensure_ascii=True)

    prompt = f"""
Create a step-by-step roadmap ONLY for these skills.

Skills (JSON array):
{skills_json}

STRICT:
- No extra skills
- Keep steps simple
- Use each skill at most once

Return ONLY JSON:

{{
  "roadmap": [
    {{"skill": "SkillName", "step": 1}}
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
    seen = set()
    for item in roadmap:
        if not isinstance(item, dict):
            continue

        skill = str(item.get("skill", "")).strip()
        if not skill:
            continue

        normalized_skill = normalize(skill)
        if normalized_skill not in allowed_skills or normalized_skill in seen:
            continue

        step = item.get("step")
        if not isinstance(step, int) or step <= 0:
            step = len(cleaned) + 1

        seen.add(normalized_skill)
        cleaned.append({"skill": skill, "step": step})

    cleaned.sort(key=lambda item: item["step"])

    if not cleaned:
        return [{"skill": skill, "step": idx + 1} for idx, skill in enumerate(cleaned_missing)]

    return cleaned
