import { useState } from "react";
import {
  NumberInput,
  Checkbox,
  Group,
  Stack,
  Button,
  Accordion,
  Paper,
  Title,
  Autocomplete,
  SimpleGrid,
} from "@mantine/core";
import { Worker } from "../types/worker";
import { parseNaturalLanguageQuery } from "../utils/naturalLanguageFilter";

interface SearchFilters {
  query: string;
  certifications: string[];
  skills: string[];
  minExperience: number;
  maxExperience: number;
  minHourlyRate: number;
  maxHourlyRate: number;
  availability: string[];
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  workers: Worker[];
  onReset: () => void;
}

const certificationOptions = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure Solutions Architect",
  "CISSP",
  "Certified Ethical Hacker",
  "PMP",
  "Scrum Master",
  "Certified Kubernetes Administrator",
  "Oracle Certified Professional",
  "Red Hat Certified Engineer",
];

const skillOptions = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "SQL",
  "MongoDB",
  "GraphQL",
  "REST API",
  "CI/CD",
  "DevOps",
];

const availabilityOptions = ["Full-time", "Part-time", "Contract", "Remote"];

export const SearchBar = ({ onSearch, workers, onReset }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedCertifications, setSelectedCertifications] = useState<
    string[]
  >([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxExperience, setMaxExperience] = useState<number>(20);
  const [minHourlyRate, setMinHourlyRate] = useState<number>(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(200);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );

  // Create search suggestions from worker names and skills
  const searchSuggestions = workers.reduce((suggestions, worker) => {
    const nameSuggestion = `${worker.firstName} ${worker.lastName}`;
    const skillSuggestions = worker.skills;
    return [...suggestions, nameSuggestion, ...skillSuggestions];
  }, [] as string[]);

  // Remove duplicates and sort alphabetically
  const uniqueSuggestions = [...new Set(searchSuggestions)].sort();

  const handleSearch = () => {
    // Check if the query looks like a natural language query
    const isNaturalLanguage =
      query.includes(" ") &&
      (query.toLowerCase().includes("year") ||
        query.toLowerCase().includes("experience") ||
        query.toLowerCase().includes("available"));

    if (isNaturalLanguage) {
      const filters = parseNaturalLanguageQuery(query);
      onSearch(filters);
    } else {
      onSearch({
        query,
        certifications: selectedCertifications,
        skills: selectedSkills,
        minExperience,
        maxExperience,
        minHourlyRate,
        maxHourlyRate,
        availability: selectedAvailability,
      });
    }
  };

  const handleReset = () => {
    setQuery("");
    setSelectedCertifications([]);
    setSelectedSkills([]);
    setMinExperience(0);
    setMaxExperience(20);
    setMinHourlyRate(0);
    setMaxHourlyRate(200);
    setSelectedAvailability([]);
    onReset();
  };

  const handleCertificationChange = (
    certification: string,
    checked: boolean
  ) => {
    setSelectedCertifications((prev) =>
      checked
        ? [...prev, certification]
        : prev.filter((c) => c !== certification)
    );
    onSearch({
      query,
      certifications: checked
        ? [...selectedCertifications, certification]
        : selectedCertifications.filter((c) => c !== certification),
      skills: selectedSkills,
      minExperience,
      maxExperience,
      minHourlyRate,
      maxHourlyRate,
      availability: selectedAvailability,
    });
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setSelectedSkills((prev) =>
      checked ? [...prev, skill] : prev.filter((s) => s !== skill)
    );
    onSearch({
      query,
      certifications: selectedCertifications,
      skills: checked
        ? [...selectedSkills, skill]
        : selectedSkills.filter((s) => s !== skill),
      minExperience,
      maxExperience,
      minHourlyRate,
      maxHourlyRate,
      availability: selectedAvailability,
    });
  };

  const handleAvailabilityChange = (type: string, checked: boolean) => {
    setSelectedAvailability((prev) =>
      checked ? [...prev, type] : prev.filter((a) => a !== type)
    );
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Search Filters</Title>

        <Group>
          <Autocomplete
            placeholder="Search by name or skills..."
            value={query}
            onChange={setQuery}
            data={uniqueSuggestions}
            limit={5}
            style={{ flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button variant="light" color="gray" onClick={handleReset}>
            Reset
          </Button>
        </Group>

        <Accordion>
          <Accordion.Item value="skills">
            <Accordion.Control>Skills</Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={3} spacing="xs">
                {skillOptions.map((skill) => (
                  <Checkbox
                    key={skill}
                    label={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={(e) =>
                      handleSkillChange(skill, e.currentTarget.checked)
                    }
                  />
                ))}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="certifications">
            <Accordion.Control>Certifications</Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid cols={3} spacing="xs">
                {certificationOptions.map((certification) => (
                  <Checkbox
                    key={certification}
                    label={certification}
                    checked={selectedCertifications.includes(certification)}
                    onChange={(e) =>
                      handleCertificationChange(
                        certification,
                        e.currentTarget.checked
                      )
                    }
                  />
                ))}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="experience">
            <Accordion.Control>Experience</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <NumberInput
                  label="Min Experience (years)"
                  placeholder="Minimum years"
                  min={0}
                  max={50}
                  value={minExperience}
                  onChange={(value) => setMinExperience(Number(value))}
                />
                <NumberInput
                  label="Max Experience (years)"
                  placeholder="Maximum years"
                  min={0}
                  max={50}
                  value={maxExperience}
                  onChange={(value) => setMaxExperience(Number(value))}
                />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="hourlyRate">
            <Accordion.Control>Hourly Rate</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <NumberInput
                  label="Min Hourly Rate ($)"
                  placeholder="Minimum rate"
                  min={0}
                  max={1000}
                  value={minHourlyRate}
                  onChange={(value) => setMinHourlyRate(Number(value))}
                />
                <NumberInput
                  label="Max Hourly Rate ($)"
                  placeholder="Maximum rate"
                  min={0}
                  max={1000}
                  value={maxHourlyRate}
                  onChange={(value) => setMaxHourlyRate(Number(value))}
                />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Stack gap="xs">
          <Title order={4} size="h6">
            Availability
          </Title>
          <Group>
            {availabilityOptions.map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={selectedAvailability.includes(type)}
                onChange={(e) =>
                  handleAvailabilityChange(type, e.currentTarget.checked)
                }
              />
            ))}
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};
