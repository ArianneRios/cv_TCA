"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Experience } from "@/lib/cv-types"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface ExperienceStepProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

const AI_SUGGESTIONS = [
  "• Led cross-functional team of 8 engineers to deliver a new customer-facing feature that increased user engagement by 35%\n• Architected and implemented a microservices solution that reduced system latency by 60%\n• Mentored 3 junior developers through code reviews and pair programming sessions",
  "• Spearheaded the migration of legacy systems to cloud infrastructure, resulting in 40% cost reduction\n• Developed and maintained RESTful APIs serving 10M+ daily requests\n• Collaborated with product managers to define technical requirements and project timelines",
  "• Built automated testing framework that improved code coverage from 45% to 92%\n• Optimized database queries resulting in 50% faster page load times\n• Presented technical proposals to stakeholders and secured buy-in for major initiatives",
]

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange([...data, newExperience])
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    )
  }

  const handleAIImprove = (id: string) => {
    setLoadingAI(id)
    // Simulate AI improvement
    setTimeout(() => {
      const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)]
      updateExperience(id, "description", randomSuggestion)
      setLoadingAI(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
        <p className="text-muted-foreground mt-1">
          Add your work experience, starting with the most recent position.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No experience added yet</p>
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp, index) => (
            <div
              key={exp.id}
              className="relative border border-border rounded-lg p-5 bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Experience {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      placeholder="Google"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position *</Label>
                    <Input
                      placeholder="Software Engineer"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="San Francisco, CA"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      placeholder="Jan 2022"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      placeholder="Present"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Description *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAIImprove(exp.id)}
                      disabled={loadingAI === exp.id}
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      {loadingAI === exp.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      Improve with AI
                    </Button>
                  </div>
                  <Textarea
                    placeholder="• Led development of new features that increased user engagement by 25%&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Mentored junior developers and conducted code reviews"
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Experience
          </Button>
        </div>
      )}
    </div>
  )
}
