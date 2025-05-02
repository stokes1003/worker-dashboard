import { Worker } from "../types/worker";
import {
  Card,
  Text,
  Group,
  Avatar,
  Badge,
  Stack,
  Button,
  Title,
} from "@mantine/core";

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard = ({ worker }: WorkerCardProps) => {
  const calculateTotalExperience = () => {
    const totalMonths = worker.experience.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return total + months;
    }, 0);
    return Math.floor(totalMonths / 12);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="md">
        <Group>
          {worker.profileImage ? (
            <Avatar src={worker.profileImage} radius="xl" size="lg" />
          ) : (
            <Avatar radius="xl" size="lg">
              {worker.firstName[0]}
              {worker.lastName[0]}
            </Avatar>
          )}
          <div>
            <Title order={3}>
              {worker.firstName} {worker.lastName}
            </Title>
            <Text c="dimmed">{worker.location}</Text>
          </div>
        </Group>
      </Card.Section>

      <Stack gap="sm">
        <Group justify="space-between">
          <Text c="dimmed">Hourly Rate:</Text>
          <Text fw={500}>${worker.hourlyRate}/hr</Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed">Experience:</Text>
          <Text fw={500}>{calculateTotalExperience()} years</Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed">Availability:</Text>
          <Badge color="blue" variant="light">
            {worker.availability}
          </Badge>
        </Group>

        <div>
          <Title order={4} size="h6" mb="xs">
            Certifications
          </Title>
          <Stack gap="xs">
            {worker.certifications.map((cert) => (
              <Text key={cert.id} size="sm">
                <Text span fw={500}>
                  {cert.name}
                </Text>
                <Text span c="dimmed">
                  {" "}
                  - {cert.issuingOrganization}
                </Text>
              </Text>
            ))}
          </Stack>
        </div>

        <div>
          <Title order={4} size="h6" mb="xs">
            Skills
          </Title>
          <Group gap="xs">
            {worker.skills.map((skill) => (
              <Badge key={skill} variant="light" color="gray">
                {skill}
              </Badge>
            ))}
          </Group>
        </div>

        <Button fullWidth mt="md" radius="md">
          Contact Worker
        </Button>
      </Stack>
    </Card>
  );
};
