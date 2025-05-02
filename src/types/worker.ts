export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  dateObtained: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: string[];
}

export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  profileImage?: string;
  certifications: Certification[];
  experience: Experience[];
  skills: string[];
  hourlyRate: number;
  availability: string[];
}

export interface SearchFilters {
  query: string;
  certifications: string[];
  skills: string[];
  minExperience: number;
  maxExperience: number;
  minHourlyRate: number;
  maxHourlyRate: number;
  availability: string[];
}
