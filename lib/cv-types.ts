export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  linkedin?: string
  website?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  achievements?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Leadership {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface CVData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  leadership: Leadership[]
  skills: string[]
}

export const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
  },
  education: [],
  experience: [],
  leadership: [],
  skills: [],
}
