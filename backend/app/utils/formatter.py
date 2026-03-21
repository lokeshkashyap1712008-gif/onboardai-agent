import json
import re


def _extract_json_candidates(text: str):
    decoder = json.JSONDecoder()
    candidates = []
    index = 0
    length = len(text)

    while index < length:
        char = text[index]
        if char not in "{[":
            index += 1
            continue

        try:
            value, offset = decoder.raw_decode(text[index:])
        except json.JSONDecodeError:
            index += 1
            continue

        candidates.append(value)
        index += max(offset, 1)

    return candidates


def extract_json(text):
    if not text:
        return None

    cleaned = text.strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    fenced_blocks = re.findall(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned, re.IGNORECASE)
    for block in reversed(fenced_blocks):
        try:
            return json.loads(block)
        except json.JSONDecodeError:
            candidates = _extract_json_candidates(block)
            if candidates:
                return candidates[-1]

    candidates = _extract_json_candidates(cleaned)
    if candidates:
        # Last JSON block usually belongs to the model output, not prompt examples.
        return candidates[-1]

    return None
