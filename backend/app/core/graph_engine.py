def _normalize(skill: str) -> str:
    return str(skill).strip().lower()


SKILL_GRAPH: dict[str, list[str]] = {
    "Machine Learning": ["Python", "Statistics"],
    "Deep Learning": ["Machine Learning"],
    "Artificial Intelligence": ["Machine Learning"],
    "Figma": ["Design Principles", "Prototyping"],
    "UI/UX": ["User Research", "Wireframing"],
    "Marketing": ["Market Research", "Content Strategy"],
    "Campaign Strategy": ["Marketing", "Analytics"],
    "Sales": ["Communication", "Negotiation"],
    "Data Analysis": ["Statistics", "Excel"],
    "Project Management": ["Planning", "Communication"],
}

_SKILL_GRAPH_LOOKUP: dict[str, list[str]] = {
    _normalize(skill): dependencies
    for skill, dependencies in SKILL_GRAPH.items()
}


def get_skill_dependencies(skill: str) -> list[str]:
    return _SKILL_GRAPH_LOOKUP.get(_normalize(skill), [])


def apply_graph_dependencies(missing_skills):
    if not isinstance(missing_skills, list):
        return []

    result = []
    seen = set()

    def add_skill(skill: str):
        cleaned = str(skill).strip()
        if not cleaned:
            return

        normalized = _normalize(cleaned)
        if normalized in seen:
            return

        seen.add(normalized)
        result.append(cleaned)

    for skill in missing_skills:
        cleaned_skill = str(skill).strip()
        if not cleaned_skill:
            continue

        add_skill(cleaned_skill)
        for dependency in get_skill_dependencies(cleaned_skill):
            add_skill(dependency)

    return result
