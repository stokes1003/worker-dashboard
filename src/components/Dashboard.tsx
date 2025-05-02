import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { WorkerCard } from "./WorkerCard";
import { WorkerStats } from "./WorkerStats";
import { Worker } from "../types/worker";
import { mockWorkers } from "../data/mockWorkers";
import {
  Container,
  Title,
  SimpleGrid,
  LoadingOverlay,
  Center,
  Stack,
} from "@mantine/core";

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

export const Dashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      // Apply filters to mock data
      const filteredWorkers = mockWorkers.filter((worker) => {
        const fullName = `${worker.firstName} ${worker.lastName}`.toLowerCase();
        const matchesQuery =
          filters.query === "" ||
          fullName.includes(filters.query.toLowerCase()) ||
          worker.skills.some((skill) =>
            skill.toLowerCase().includes(filters.query.toLowerCase())
          );

        const matchesSkills =
          filters.skills.length === 0 ||
          filters.skills.some((skill) =>
            worker.skills.some((workerSkill) =>
              workerSkill.toLowerCase().includes(skill.toLowerCase())
            )
          );

        // Calculate total experience in years
        const totalExperience =
          worker.experience.reduce((total, exp) => {
            const start = new Date(exp.startDate);
            const end = exp.endDate ? new Date(exp.endDate) : new Date();
            const months =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth());
            return total + months;
          }, 0) / 12;

        const matchesExperience =
          totalExperience >= filters.minExperience &&
          totalExperience <= filters.maxExperience;

        const matchesHourlyRate =
          worker.hourlyRate >= filters.minHourlyRate &&
          worker.hourlyRate <= filters.maxHourlyRate;

        const matchesAvailability =
          filters.availability.length === 0 ||
          filters.availability.some((avail) =>
            worker.availability.includes(avail)
          );

        return (
          matchesQuery &&
          matchesSkills &&
          matchesExperience &&
          matchesHourlyRate &&
          matchesAvailability
        );
      });

      setWorkers(filteredWorkers);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Find Workers
      </Title>

      <Stack gap="xl">
        <WorkerStats workers={workers.length > 0 ? workers : mockWorkers} />

        <SearchBar
          onSearch={handleSearch}
          workers={workers.length > 0 ? workers : mockWorkers}
          onReset={() => setWorkers([])}
        />

        <div style={{ position: "relative" }}>
          <LoadingOverlay visible={isLoading} />

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {workers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
            {workers.length === 0 && (
              <Center style={{ gridColumn: "1 / -1", padding: "2rem" }}>
                <Title order={4} c="dimmed">
                  No workers found. Try adjusting your search criteria.
                </Title>
              </Center>
            )}
          </SimpleGrid>
        </div>
      </Stack>
    </Container>
  );
};
