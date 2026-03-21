import os
from pathlib import Path
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

def _normalize_supabase_url(raw_url: str | None) -> str | None:
    if not raw_url:
        return None

    cleaned = raw_url.strip().rstrip("/")
    dashboard_prefix = "https://supabase.com/dashboard/project/"

    if cleaned.startswith(dashboard_prefix):
        project_ref = cleaned[len(dashboard_prefix):].split("/")[0]
        if project_ref:
            return f"https://{project_ref}.supabase.co"

    return cleaned


HF_API_KEY = (
    os.getenv("HF_API_KEY")
    or os.getenv("HUGGINGFACEHUB_API_TOKEN")
    or os.getenv("HF_TOKEN")
    or ""
).strip()
HF_MODEL = os.getenv("HF_MODEL", "meta-llama/Llama-3.1-8B-Instruct")

client = InferenceClient(api_key=HF_API_KEY) if HF_API_KEY else None

SUPABASE_URL = _normalize_supabase_url(os.getenv("SUPABASE_URL"))
SUPABASE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("SUPABASE_KEY")
    or ""
).strip()
