export function getSkillName(skill) {
  if (!skill) {
    return "";
  }

  if (typeof skill === "string") {
    return skill;
  }

  return skill.name || skill.skill || "";
}

export function formatAnalysisDate(value) {
  if (!value) {
    return "Saved recently";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Saved recently";
  }

  return date.toLocaleString();
}

export function getAnalysisTitle(item) {
  const required = item?.required_skills?.[0];
  if (required) {
    return required;
  }

  const firstGap = getSkillName(item?.gaps?.[0]);
  if (firstGap) {
    return `${firstGap} roadmap`;
  }

  return "Candidate analysis";
}

export function normalizeGapItems(gaps) {
  return (gaps || []).map((gap, index) => {
    if (typeof gap === "string") {
      return { skill: gap, step: index + 1 };
    }

    return {
      skill: gap.skill || gap.name || `Gap ${index + 1}`,
      step: gap.step || index + 1,
    };
  });
}

export function summarizeInsights(items) {
  const topSkills = new Map();
  const commonGaps = new Map();

  items.forEach((item) => {
    (item.skills || []).forEach((skill) => {
      const name = getSkillName(skill);
      if (!name) {
        return;
      }

      topSkills.set(name, (topSkills.get(name) || 0) + 1);
    });

    normalizeGapItems(item.gaps).forEach((gap) => {
      if (!gap.skill) {
        return;
      }

      commonGaps.set(gap.skill, (commonGaps.get(gap.skill) || 0) + 1);
    });
  });

  const sortEntries = (map) =>
    [...map.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 6);

  return {
    topSkills: sortEntries(topSkills),
    commonGaps: sortEntries(commonGaps),
  };
}
