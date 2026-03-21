from app.config import client
from app.utils.formatter import extract_json

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    data = extract_json(response.text)

    return data if data else {"skills": []}