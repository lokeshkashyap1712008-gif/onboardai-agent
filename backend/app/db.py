import logging
from typing import Any

from supabase import Client, create_client

from app.config import SUPABASE_KEY, SUPABASE_URL

logger = logging.getLogger(__name__)

supabase: Client | None = None
ANALYSIS_COLUMNS = {
    "resume",
    "job_description",
    "skills",
    "required_skills",
    "gaps",
    "roadmap",
    "decision_trace",
}

if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as exc:
        logger.warning("Supabase client initialization failed: %s", exc)
else:
    logger.warning("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")


def save_analysis(payload: dict[str, Any]) -> dict[str, Any]:
    if supabase is None:
        return {"saved": False, "reason": "Supabase is not configured."}

    try:
        db_payload = {
            key: value
            for key, value in payload.items()
            if key in ANALYSIS_COLUMNS
        }
        response = supabase.table("analyses").insert(db_payload).execute()
        rows = response.data or []
        record = rows[0] if rows else None
        return {"saved": True, "record": record}
    except Exception as exc:
        logger.warning("Supabase insert failed: %s", exc)
        return {"saved": False, "reason": str(exc)}


def list_analyses(limit: int = 50) -> list[dict[str, Any]]:
    if supabase is None:
        return []

    try:
        response = (
            supabase.table("analyses")
            .select("*")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return response.data or []
    except Exception as exc:
        logger.warning("Supabase history query failed: %s", exc)
        try:
            response = supabase.table("analyses").select("*").limit(limit).execute()
            rows = response.data or []
            return list(reversed(rows))
        except Exception as fallback_exc:
            logger.warning("Supabase fallback history query failed: %s", fallback_exc)
            return []


def get_analysis(record_id: str) -> dict[str, Any] | None:
    if supabase is None:
        return None

    try:
        response = (
            supabase.table("analyses")
            .select("*")
            .eq("id", record_id)
            .limit(1)
            .execute()
        )
        rows = response.data or []
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("Supabase single analysis query failed: %s", exc)
        return None
