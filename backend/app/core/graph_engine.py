SKILL_GRAPH = {
    "Machine Learning": ["Python", "Statistics"],
    "Deep Learning": ["Machine Learning"],
    "AI": ["Machine Learning"]
}

def apply_graph_dependencies(missing_skills):
    result = set(missing_skills)

    for skill in missing_skills:
        if skill in SKILL_GRAPH:
            for dep in SKILL_GRAPH[skill]:
                result.add(dep)

    return list(result)