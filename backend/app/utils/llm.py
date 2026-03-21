from typing import Any

from app.config import HF_MODEL, client

FALLBACK_MODELS = [
    "meta-llama/Llama-3.1-8B-Instruct",
    "Qwen/Qwen2.5-7B-Instruct",
]


def _get_message_content(choice: Any) -> Any:
    if isinstance(choice, dict):
        message = choice.get("message", {})
        if isinstance(message, dict):
            return message.get("content")
        return getattr(message, "content", "")

    message = getattr(choice, "message", None)
    if isinstance(message, dict):
        return message.get("content")

    return getattr(message, "content", "")


def _stringify_content(content: Any) -> str:
    if isinstance(content, str):
        return content

    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, dict):
                text = item.get("text") or item.get("content")
                if text:
                    parts.append(str(text))
            elif isinstance(item, str):
                parts.append(item)
        return "\n".join(parts)

    return str(content or "")


def generate_text(prompt: str, max_tokens: int = 700) -> str:
    if client is None:
        raise RuntimeError("Missing Hugging Face API key. Set HF_API_KEY in backend/.env.")

    models_to_try = []
    for model in [HF_MODEL, *FALLBACK_MODELS]:
        if model and model not in models_to_try:
            models_to_try.append(model)

    last_error = None
    for model in models_to_try:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_tokens=max_tokens,
            )

            choices = getattr(response, "choices", None)
            if not choices:
                continue

            content = _get_message_content(choices[0])
            text = _stringify_content(content).strip()

            # Defensive fallback for providers that still echo the prompt.
            if text.startswith(prompt):
                text = text[len(prompt):].strip()

            if text:
                return text
        except Exception as exc:
            last_error = exc

    if last_error is not None:
        raise last_error

    return ""
