SKILL_GRAPH: dict[str, list[str]] = {}


def apply_graph_dependencies(missing_skills):
    def normalize(skill: str) -> str:
        return str(skill).strip().lower()

    if not isinstance(missing_skills, list):
        return []

    result = []
    seen = set()

    def add_skill(skill: str):
        cleaned = str(skill).strip()
        if not cleaned:
            return

        normalized = normalize(cleaned)
        if normalized in seen:
            return

        seen.add(normalized)
        result.append(cleaned)

    for skill in missing_skills:
        cleaned_skill = str(skill).strip()
        if not cleaned_skill:
            continue

        add_skill(cleaned_skill)
        for dependency in SKILL_GRAPH.get(cleaned_skill, []):
            add_skill(dependency)

    return result
