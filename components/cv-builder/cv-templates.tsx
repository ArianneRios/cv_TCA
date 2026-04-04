"use client"

import type { CVData } from "@/lib/cv-types"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

export type TemplateType = "harvard" | "modern" | "minimal"

interface CVTemplateProps {
  data: CVData
  template: TemplateType
}

export function CVTemplate({ data, template }: CVTemplateProps) {
  switch (template) {
    case "harvard":
      return <HarvardTemplate data={data} />
    case "modern":
      return <ModernTemplate data={data} />
    case "minimal":
      return <MinimalTemplate data={data} />
    default:
      return <HarvardTemplate data={data} />
  }
}

function HarvardTemplate({ data }: { data: CVData }) {
  const { personalInfo, education, experience, leadership, skills } = data

  return (
    <div className="p-6 sm:p-10 font-serif" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Header */}
      <header className="text-center border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {personalInfo.address}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {personalInfo.email}
            </span>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide border-b border-border pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{edu.institution}</h3>
                    <p className="text-muted-foreground">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    {edu.startDate}
                    {edu.endDate && ` - ${edu.endDate}`}
                  </span>
                </div>
                {edu.achievements && (
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    {edu.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide border-b border-border pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{exp.position}</h3>
                    <p className="text-muted-foreground">
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    {exp.startDate}
                    {exp.endDate && ` - ${exp.endDate}`}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {leadership.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide border-b border-border pb-1 mb-3">
            Leadership & Activities
          </h2>
          <div className="space-y-4">
            {leadership.map((lead) => (
              <div key={lead.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{lead.role}</h3>
                    <p className="text-muted-foreground">{lead.organization}</p>
                  </div>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    {lead.startDate}
                    {lead.endDate && ` - ${lead.endDate}`}
                  </span>
                </div>
                {lead.description && (
                  <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                    {lead.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide border-b border-border pb-1 mb-3">
            Skills
          </h2>
          <p className="text-muted-foreground">{skills.join(" • ")}</p>
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.fullName &&
        education.length === 0 &&
        experience.length === 0 &&
        leadership.length === 0 &&
        skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Your CV preview will appear here as you fill in the form.</p>
          </div>
        )}
    </div>
  )
}

function ModernTemplate({ data }: { data: CVData }) {
  const { personalInfo, education, experience, leadership, skills } = data

  return (
    <div className="p-6 sm:p-10 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {personalInfo.address}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-muted-foreground">
              <Linkedin className="h-3.5 w-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Skills */}
        <div className="md:col-span-1 space-y-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-foreground text-sm">{edu.institution}</h3>
                    <p className="text-xs text-muted-foreground">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.startDate}
                      {edu.endDate && ` - ${edu.endDate}`}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Experience & Leadership */}
        <div className="md:col-span-2 space-y-6">
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-primary">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                          {exp.location && ` | ${exp.location}`}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {exp.startDate}
                        {exp.endDate && ` - ${exp.endDate}`}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {leadership.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Leadership & Activities
              </h2>
              <div className="space-y-5">
                {leadership.map((lead) => (
                  <div key={lead.id} className="relative pl-4 border-l-2 border-primary">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <h3 className="font-semibold text-foreground">{lead.role}</h3>
                        <p className="text-sm text-muted-foreground">{lead.organization}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {lead.startDate}
                        {lead.endDate && ` - ${lead.endDate}`}
                      </span>
                    </div>
                    {lead.description && (
                      <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                        {lead.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName &&
        education.length === 0 &&
        experience.length === 0 &&
        leadership.length === 0 &&
        skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Your CV preview will appear here as you fill in the form.</p>
          </div>
        )}
    </div>
  )
}

function MinimalTemplate({ data }: { data: CVData }) {
  const { personalInfo, education, experience, leadership, skills } = data

  return (
    <div className="p-6 sm:p-10 font-sans">
      {/* Header */}
      <header className="border-b border-border pb-6 mb-6">
        <h1 className="text-2xl font-medium text-foreground">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <span className="font-medium text-foreground">{exp.position}</span>
                    <span className="text-muted-foreground"> at {exp.company}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <span className="font-medium text-foreground">{edu.degree}</span>
                  {edu.field && <span className="text-muted-foreground"> in {edu.field}</span>}
                  <span className="text-muted-foreground">, {edu.institution}</span>
                  {edu.gpa && <span className="text-muted-foreground"> ({edu.gpa})</span>}
                </div>
                <span className="text-sm text-muted-foreground">
                  {edu.endDate || edu.startDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Leadership
          </h2>
          <div className="space-y-3">
            {leadership.map((lead) => (
              <div key={lead.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <span className="font-medium text-foreground">{lead.role}</span>
                    <span className="text-muted-foreground">, {lead.organization}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {lead.startDate} - {lead.endDate || "Present"}
                  </span>
                </div>
                {lead.description && (
                  <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                    {lead.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Skills
          </h2>
          <p className="text-sm text-muted-foreground">{skills.join(", ")}</p>
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.fullName &&
        education.length === 0 &&
        experience.length === 0 &&
        leadership.length === 0 &&
        skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Your CV preview will appear here as you fill in the form.</p>
          </div>
        )}
    </div>
  )
}
