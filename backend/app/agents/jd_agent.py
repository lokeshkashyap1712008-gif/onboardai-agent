from app.config import client
from app.utils.formatter import extract_json

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    data = extract_json(response.text)

    return data if data else {"required_skills": []}