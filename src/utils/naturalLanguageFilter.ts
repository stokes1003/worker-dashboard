import { SearchFilters } from "../types/worker";

export const parseNaturalLanguageQuery = (query: string): SearchFilters => {
  // Default filters
  const filters: SearchFilters = {
    query: "",
    certifications: [],
    skills: [],
    minExperience: 0,
    maxExperience: 20,
    minHourlyRate: 0,
    maxHourlyRate: 200,
    availability: [],
  };

  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();

  // Extract years of experience
  const experienceMatch = lowerQuery.match(
    /(\d+)\s*(?:year|years|yr|yrs)\s*(?:of\s*)?experience/
  );
  if (experienceMatch) {
    const years = parseInt(experienceMatch[1]);
    filters.minExperience = years;
    filters.maxExperience = years;
  }

  // Extract skills
  const skills = [
    "python",
    "java",
    "react",
    "typescript",
    "node.js",
    "aws",
    "azure",
    "docker",
    "kubernetes",
    "sql",
  ];
  filters.skills = skills.filter((skill) => lowerQuery.includes(skill));

  // Extract availability
  if (lowerQuery.includes("full time") || lowerQuery.includes("full-time")) {
    filters.availability.push("Full-time");
  }
  if (lowerQuery.includes("part time") || lowerQuery.includes("part-time")) {
    filters.availability.push("Part-time");
  }
  if (lowerQuery.includes("contract")) {
    filters.availability.push("Contract");
  }
  if (lowerQuery.includes("remote")) {
    filters.availability.push("Remote");
  }

  return filters;
};
