import { Worker } from "../types/worker";
import {
  Paper,
  Title,
  SimpleGrid,
  Text,
  Group,
  ThemeIcon,
  Center,
  Stack,
} from "@mantine/core";
import { BarChart, PieChart } from "@mantine/charts";
import {
  IconUsers,
  IconClock,
  IconCurrencyDollar,
  IconCertificate,
} from "@tabler/icons-react";

interface WorkerStatsProps {
  workers: Worker[];
}

export const WorkerStats = ({ workers }: WorkerStatsProps) => {
  // Calculate experience distribution
  const experienceData = workers.reduce((acc, worker) => {
    const experience = worker.experience.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return total + months;
    }, 0);
    const years = Math.floor(experience / 12);

    // Define experience ranges
    let range: string;
    if (years <= 1) {
      range = "0-1 years";
    } else if (years <= 4) {
      range = "2-4 years";
    } else if (years <= 8) {
      range = "4-8 years";
    } else {
      range = "8+ years";
    }

    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Ensure all ranges are present in the data
  const allRanges = ["0-1 years", "2-4 years", "4-8 years", "8+ years"];
  const experienceChartData = allRanges.map((range) => ({
    range,
    count: experienceData[range] || 0,
  }));

  // Calculate skills distribution
  const skillsData = workers.reduce((acc, worker) => {
    worker.skills.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topSkills = Object.entries(skillsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([skill, count]) => ({
      name: skill,
      count,
    }));

  const COLORS = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#96CEB4", // Green
    "#FFEEAD", // Yellow
    "#D4A5A5", // Pink
    "#9B59B6", // Purple
    "#E67E22", // Orange
    "#34495E", // Dark Blue
    "#1ABC9C", // Turquoise
  ];

  const pieChartData = topSkills.map((skill, index) => ({
    name: skill.name,
    value: skill.count,
    color: COLORS[index % COLORS.length],
  }));

  // Calculate additional statistics
  const totalCertifications = workers.reduce(
    (sum, worker) => sum + worker.certifications.length,
    0
  );
  const avgHourlyRate =
    workers.reduce((sum, worker) => sum + worker.hourlyRate, 0) /
    workers.length;
  const avgExperience =
    workers.reduce((sum, worker) => {
      const experience = worker.experience.reduce((total, exp) => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : new Date();
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());
        return total + months;
      }, 0);
      return sum + experience / 12;
    }, 0) / workers.length;

  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group>
            <ThemeIcon size="xl" radius="md" variant="light">
              <IconUsers size={24} />
            </ThemeIcon>
            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                Total Workers
              </Text>
              <Text fw={700} size="xl">
                {workers.length}
              </Text>
            </div>
          </Group>

          <Group>
            <ThemeIcon size="xl" radius="md" variant="light" color="green">
              <IconCertificate size={24} />
            </ThemeIcon>
            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                Total Certifications
              </Text>
              <Text fw={700} size="xl">
                {totalCertifications}
              </Text>
            </div>
          </Group>

          <Group>
            <ThemeIcon size="xl" radius="md" variant="light" color="yellow">
              <IconClock size={24} />
            </ThemeIcon>
            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                Avg Experience
              </Text>
              <Text fw={700} size="xl">
                {avgExperience.toFixed(1)} years
              </Text>
            </div>
          </Group>

          <Group>
            <ThemeIcon size="xl" radius="md" variant="light" color="blue">
              <IconCurrencyDollar size={24} />
            </ThemeIcon>
            <div>
              <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                Avg Hourly Rate
              </Text>
              <Text fw={700} size="xl">
                ${avgHourlyRate.toFixed(2)}
              </Text>
            </div>
          </Group>
        </Stack>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Title order={3} mb="md">
          Experience Distribution
        </Title>
        <BarChart
          h={200}
          data={experienceChartData}
          dataKey="range"
          series={[{ name: "count", color: "blue.6" }]}
          tickLine="y"
          gridAxis="xy"
          withTooltip
        />
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Title order={3} mb="md">
          Top Skills
        </Title>
        <Center>
          <Group align="flex-start" gap="md">
            <PieChart
              h={180}
              w={180}
              data={pieChartData}
              withTooltip
              tooltipDataSource="segment"
            />
            <Stack gap="xs" mt="md">
              {pieChartData.map((item) => {
                const percentage = (
                  (item.value / workers.length) *
                  100
                ).toFixed(1);
                return (
                  <Group key={item.name} gap="xs">
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: item.color,
                        borderRadius: 2,
                      }}
                    />
                    <Text size="xs">
                      {item.name} ({percentage}%)
                    </Text>
                  </Group>
                );
              })}
            </Stack>
          </Group>
        </Center>
      </Paper>
    </SimpleGrid>
  );
};
