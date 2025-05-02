import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { WorkerCard } from "./WorkerCard";
import { WorkerStats } from "./WorkerStats";
import { Worker } from "../types/worker";
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
  minExperience: number;
  maxExperience: number;
  minHourlyRate: number;
  maxHourlyRate: number;
  availability: string[];
  skills: string[];
}

const mockWorkers: Worker[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    location: "New York",
    certifications: [
      {
        id: "1",
        name: "AWS Certified Solutions Architect",
        issuingOrganization: "AWS",
        dateObtained: "2023-01-01",
      },
      {
        id: "2",
        name: "Google Cloud Professional",
        issuingOrganization: "Google",
        dateObtained: "2023-02-01",
      },
    ],
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        position: "Software Engineer",
        startDate: "2023-01-01",
        endDate: null,
        description: "Full-stack development",
        skills: ["React", "TypeScript", "Node.js"],
      },
    ],
    skills: ["React", "TypeScript", "Node.js"],
    hourlyRate: 75,
    availability: ["Full-time", "Remote"],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    location: "San Francisco",
    certifications: [
      {
        id: "3",
        name: "Microsoft Azure Solutions Architect",
        issuingOrganization: "Microsoft",
        dateObtained: "2022-01-01",
      },
      {
        id: "4",
        name: "CISSP",
        issuingOrganization: "ISC2",
        dateObtained: "2021-01-01",
      },
    ],
    experience: [
      {
        id: "2",
        company: "Security Solutions",
        position: "Security Engineer",
        startDate: "2014-06-01",
        endDate: null,
        description: "Security architecture and implementation",
        skills: ["Cybersecurity", "Cloud Security", "Network Security"],
      },
      {
        id: "3",
        company: "Cyber Defense",
        position: "Security Analyst",
        startDate: "2010-03-01",
        endDate: "2014-05-31",
        description: "Threat analysis and incident response",
        skills: ["Security Analysis", "Incident Response", "Threat Detection"],
      },
    ],
    skills: ["Cybersecurity", "Cloud Security", "Network Security"],
    hourlyRate: 120,
    availability: ["Full-time", "Contract"],
  },
  {
    id: "3",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    location: "Chicago",
    certifications: [
      {
        id: "5",
        name: "Certified Kubernetes Administrator",
        issuingOrganization: "CNCF",
        dateObtained: "2023-08-01",
      },
    ],
    experience: [
      {
        id: "4",
        company: "Cloud Systems",
        position: "DevOps Engineer",
        startDate: "2023-08-01",
        endDate: null,
        description: "CI/CD pipeline management",
        skills: ["Kubernetes", "Docker", "AWS"],
      },
    ],
    skills: ["Kubernetes", "Docker", "AWS"],
    hourlyRate: 65,
    availability: ["Part-time", "Remote"],
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    location: "Boston",
    certifications: [
      {
        id: "6",
        name: "PMP",
        issuingOrganization: "PMI",
        dateObtained: "2012-01-01",
      },
      {
        id: "7",
        name: "Scrum Master",
        issuingOrganization: "Scrum Alliance",
        dateObtained: "2011-01-01",
      },
    ],
    experience: [
      {
        id: "5",
        company: "Enterprise Solutions",
        position: "Project Manager",
        startDate: "2012-01-01",
        endDate: null,
        description: "Project management and team leadership",
        skills: ["Project Management", "Agile", "Leadership"],
      },
      {
        id: "6",
        company: "Tech Innovations",
        position: "Senior Developer",
        startDate: "2008-06-01",
        endDate: "2011-12-31",
        description: "Software development and architecture",
        skills: ["Java", "Spring", "Microservices"],
      },
    ],
    skills: ["Project Management", "Agile", "Leadership"],
    hourlyRate: 95,
    availability: ["Full-time", "Contract"],
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    location: "Seattle",
    certifications: [
      {
        id: "8",
        name: "Oracle Certified Professional",
        issuingOrganization: "Oracle",
        dateObtained: "2022-03-01",
      },
    ],
    experience: [
      {
        id: "7",
        company: "Database Systems",
        position: "Database Administrator",
        startDate: "2022-03-01",
        endDate: null,
        description: "Database management and optimization",
        skills: ["Oracle", "SQL", "Database Design"],
      },
    ],
    skills: ["Oracle", "SQL", "Database Design"],
    hourlyRate: 70,
    availability: ["Full-time", "Remote"],
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@example.com",
    location: "Boston, MA",
    certifications: [
      {
        id: "7",
        name: "Certified Scrum Master",
        issuingOrganization: "Scrum Alliance",
        dateObtained: "2022-02-15",
      },
    ],
    experience: [
      {
        id: "6",
        company: "Agile Solutions",
        position: "Scrum Master",
        startDate: "2018-07-01",
        endDate: "2023-12-31",
        description: "Agile project management",
        skills: ["Scrum", "Agile", "Project Management"],
      },
    ],
    skills: ["Scrum", "Agile", "Project Management", "JIRA"],
    hourlyRate: 70,
    availability: ["Full-time"],
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert@example.com",
    location: "Denver, CO",
    certifications: [
      {
        id: "8",
        name: "Certified Data Professional",
        issuingOrganization: "Data Management Association",
        dateObtained: "2021-09-10",
      },
    ],
    experience: [
      {
        id: "7",
        company: "Data Analytics",
        position: "Data Scientist",
        startDate: "2019-01-01",
        endDate: "2023-12-31",
        description: "Data analysis and machine learning",
        skills: ["Python", "Machine Learning", "Data Analysis"],
      },
    ],
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    hourlyRate: 100,
    availability: ["Full-time"],
  },
  {
    id: "8",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifer@example.com",
    location: "Miami, FL",
    certifications: [
      {
        id: "9",
        name: "Certified Ethical Hacker",
        issuingOrganization: "EC-Council",
        dateObtained: "2022-05-20",
      },
    ],
    experience: [
      {
        id: "8",
        company: "Cyber Security",
        position: "Penetration Tester",
        startDate: "2020-03-01",
        endDate: "2023-12-31",
        description: "Security testing and vulnerability assessment",
        skills: ["Security Testing", "Penetration Testing", "Ethical Hacking"],
      },
    ],
    skills: [
      "Security Testing",
      "Penetration Testing",
      "Ethical Hacking",
      "Python",
    ],
    hourlyRate: 110,
    availability: ["Full-time"],
  },
  {
    id: "9",
    firstName: "William",
    lastName: "Anderson",
    email: "william@example.com",
    location: "Portland, OR",
    certifications: [
      {
        id: "10",
        name: "Red Hat Certified Engineer",
        issuingOrganization: "Red Hat",
        dateObtained: "2021-12-15",
      },
    ],
    experience: [
      {
        id: "9",
        company: "Linux Solutions",
        position: "Linux System Administrator",
        startDate: "2017-06-01",
        endDate: "2023-12-31",
        description: "Linux system administration",
        skills: ["Linux", "Bash", "System Administration"],
      },
    ],
    skills: ["Linux", "Bash", "System Administration", "Python"],
    hourlyRate: 75,
    availability: ["Full-time"],
  },
  {
    id: "10",
    firstName: "Lisa",
    lastName: "Thomas",
    email: "lisa@example.com",
    location: "Atlanta, GA",
    certifications: [
      {
        id: "11",
        name: "Project Management Professional",
        issuingOrganization: "PMI",
        dateObtained: "2022-01-10",
      },
    ],
    experience: [
      {
        id: "10",
        company: "Project Management",
        position: "Project Manager",
        startDate: "2018-01-01",
        endDate: "2023-12-31",
        description: "IT project management",
        skills: ["Project Management", "Agile", "Scrum"],
      },
    ],
    skills: ["Project Management", "Agile", "Scrum", "JIRA"],
    hourlyRate: 85,
    availability: ["Full-time"],
  },
  {
    id: "11",
    firstName: "James",
    lastName: "Jackson",
    email: "james@example.com",
    location: "Dallas, TX",
    certifications: [
      {
        id: "12",
        name: "Cisco Certified Network Professional",
        issuingOrganization: "Cisco",
        dateObtained: "2021-08-20",
      },
    ],
    experience: [
      {
        id: "11",
        company: "Network Solutions",
        position: "Network Engineer",
        startDate: "2016-03-01",
        endDate: "2023-12-31",
        description: "Network infrastructure management",
        skills: ["Networking", "Cisco", "Routing"],
      },
    ],
    skills: ["Networking", "Cisco", "Routing", "Switching"],
    hourlyRate: 80,
    availability: ["Full-time"],
  },
  {
    id: "12",
    firstName: "Patricia",
    lastName: "White",
    email: "patricia@example.com",
    location: "Phoenix, AZ",
    certifications: [
      {
        id: "13",
        name: "Certified Information Systems Auditor",
        issuingOrganization: "ISACA",
        dateObtained: "2022-04-15",
      },
    ],
    experience: [
      {
        id: "12",
        company: "IT Audit",
        position: "IT Auditor",
        startDate: "2019-01-01",
        endDate: "2023-12-31",
        description: "IT systems auditing",
        skills: ["Auditing", "Compliance", "Risk Management"],
      },
    ],
    skills: ["Auditing", "Compliance", "Risk Management", "Excel"],
    hourlyRate: 90,
    availability: ["Full-time"],
  },
  {
    id: "13",
    firstName: "Charles",
    lastName: "Harris",
    email: "charles@example.com",
    location: "Philadelphia, PA",
    certifications: [
      {
        id: "14",
        name: "Microsoft Certified: DevOps Engineer Expert",
        issuingOrganization: "Microsoft",
        dateObtained: "2021-11-20",
      },
    ],
    experience: [
      {
        id: "13",
        company: "DevOps Solutions",
        position: "DevOps Engineer",
        startDate: "2018-07-01",
        endDate: "2023-12-31",
        description: "DevOps implementation",
        skills: ["DevOps", "CI/CD", "Docker"],
      },
    ],
    skills: ["DevOps", "CI/CD", "Docker", "Kubernetes"],
    hourlyRate: 95,
    availability: ["Full-time"],
  },
  {
    id: "14",
    firstName: "Linda",
    lastName: "Martin",
    email: "linda@example.com",
    location: "San Diego, CA",
    certifications: [
      {
        id: "15",
        name: "Certified Business Analysis Professional",
        issuingOrganization: "IIBA",
        dateObtained: "2022-03-10",
      },
    ],
    experience: [
      {
        id: "14",
        company: "Business Analysis",
        position: "Business Analyst",
        startDate: "2017-01-01",
        endDate: "2023-12-31",
        description: "Business requirements analysis",
        skills: ["Business Analysis", "Requirements", "Documentation"],
      },
    ],
    skills: ["Business Analysis", "Requirements", "Documentation", "SQL"],
    hourlyRate: 75,
    availability: ["Full-time"],
  },
  {
    id: "15",
    firstName: "Thomas",
    lastName: "Thompson",
    email: "thomas@example.com",
    location: "Detroit, MI",
    certifications: [
      {
        id: "16",
        name: "Certified Information Security Manager",
        issuingOrganization: "ISACA",
        dateObtained: "2021-10-15",
      },
    ],
    experience: [
      {
        id: "15",
        company: "Security Management",
        position: "Security Manager",
        startDate: "2016-05-01",
        endDate: "2023-12-31",
        description: "Security program management",
        skills: ["Security Management", "Risk Assessment", "Compliance"],
      },
    ],
    skills: ["Security Management", "Risk Assessment", "Compliance", "Policy"],
    hourlyRate: 105,
    availability: ["Full-time"],
  },
  {
    id: "16",
    firstName: "Barbara",
    lastName: "Garcia",
    email: "barbara@example.com",
    location: "Houston, TX",
    certifications: [
      {
        id: "17",
        name: "Certified Cloud Security Professional",
        issuingOrganization: "ISC2",
        dateObtained: "2022-02-20",
      },
    ],
    experience: [
      {
        id: "16",
        company: "Cloud Security",
        position: "Cloud Security Architect",
        startDate: "2019-03-01",
        endDate: "2023-12-31",
        description: "Cloud security architecture",
        skills: ["Cloud Security", "AWS", "Azure"],
      },
    ],
    skills: ["Cloud Security", "AWS", "Azure", "Compliance"],
    hourlyRate: 115,
    availability: ["Full-time"],
  },
  {
    id: "17",
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel@example.com",
    location: "Las Vegas, NV",
    certifications: [
      {
        id: "18",
        name: "Certified Ethical Hacker",
        issuingOrganization: "EC-Council",
        dateObtained: "2021-12-10",
      },
    ],
    experience: [
      {
        id: "17",
        company: "Ethical Hacking",
        position: "Security Consultant",
        startDate: "2018-01-01",
        endDate: "2023-12-31",
        description: "Security consulting and testing",
        skills: ["Ethical Hacking", "Penetration Testing", "Security"],
      },
    ],
    skills: ["Ethical Hacking", "Penetration Testing", "Security", "Python"],
    hourlyRate: 100,
    availability: ["Full-time"],
  },
  {
    id: "18",
    firstName: "Karen",
    lastName: "Robinson",
    email: "karen@example.com",
    location: "Orlando, FL",
    certifications: [
      {
        id: "19",
        name: "Certified Information Privacy Professional",
        issuingOrganization: "IAPP",
        dateObtained: "2022-05-15",
      },
    ],
    experience: [
      {
        id: "18",
        company: "Privacy Solutions",
        position: "Privacy Officer",
        startDate: "2017-07-01",
        endDate: "2023-12-31",
        description: "Privacy program management",
        skills: ["Privacy", "Compliance", "GDPR"],
      },
    ],
    skills: ["Privacy", "Compliance", "GDPR", "Policy"],
    hourlyRate: 90,
    availability: ["Full-time"],
  },
  {
    id: "19",
    firstName: "Paul",
    lastName: "Clark",
    email: "paul@example.com",
    location: "Nashville, TN",
    certifications: [
      {
        id: "20",
        name: "Certified Information Systems Security Professional",
        issuingOrganization: "ISC2",
        dateObtained: "2021-09-20",
      },
    ],
    experience: [
      {
        id: "19",
        company: "Security Solutions",
        position: "Security Architect",
        startDate: "2016-01-01",
        endDate: "2023-12-31",
        description: "Security architecture design",
        skills: ["Security Architecture", "Risk Management", "Compliance"],
      },
    ],
    skills: [
      "Security Architecture",
      "Risk Management",
      "Compliance",
      "Policy",
    ],
    hourlyRate: 110,
    availability: ["Full-time"],
  },
  {
    id: "20",
    firstName: "Nancy",
    lastName: "Rodriguez",
    email: "nancy@example.com",
    location: "San Antonio, TX",
    certifications: [
      {
        id: "21",
        name: "Certified Scrum Product Owner",
        issuingOrganization: "Scrum Alliance",
        dateObtained: "2022-01-10",
      },
    ],
    experience: [
      {
        id: "20",
        company: "Product Management",
        position: "Product Owner",
        startDate: "2018-03-01",
        endDate: "2023-12-31",
        description: "Product management and development",
        skills: ["Product Management", "Agile", "Scrum"],
      },
    ],
    skills: ["Product Management", "Agile", "Scrum", "JIRA"],
    hourlyRate: 85,
    availability: ["Full-time"],
  },
];

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
