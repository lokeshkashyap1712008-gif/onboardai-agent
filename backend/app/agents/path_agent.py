from app.config import client
from app.utils.formatter import extract_json

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    data = extract_json(response.text)

    if data and "roadmap" in data:
        return data["roadmap"]

    return []