import logging
from typing import Any

from supabase import Client, create_client

from app.config import SUPABASE_KEY, SUPABASE_URL

logger = logging.getLogger(__name__)

supabase: Client | None = None

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
        supabase.table("analyses").insert(payload).execute()
        return {"saved": True}
    except Exception as exc:
        logger.warning("Supabase insert failed: %s", exc)
        return {"saved": False, "reason": str(exc)}
