"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Education } from "@/lib/cv-types"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface EducationStepProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

const AI_SUGGESTIONS = [
  "Dean's List (Fall 2021, Spring 2022), Relevant coursework: Data Structures, Algorithms, Machine Learning, Database Systems",
  "Summa Cum Laude, Undergraduate Research Assistant, Published paper in IEEE conference",
  "Honors Program, Teaching Assistant for Introduction to Programming, Hackathon Winner (1st Place)",
]

export function EducationStep({ data, onChange }: EducationStepProps) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: "",
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    )
  }

  const handleAIImprove = (id: string) => {
    setLoadingAI(id)
    setTimeout(() => {
      const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)]
      updateEducation(id, "achievements", randomSuggestion)
      setLoadingAI(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Education</h2>
        <p className="text-muted-foreground mt-1">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((edu, index) => (
            <div
              key={edu.id}
              className="relative border border-border rounded-lg p-5 bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Education {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="Harvard University"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      placeholder="Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, "field", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      placeholder="Sep 2018"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      placeholder="May 2022"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      placeholder="3.8/4.0"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(edu.id, "gpa", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Achievements / Activities</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAIImprove(edu.id)}
                      disabled={loadingAI === edu.id}
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      {loadingAI === edu.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      Improve with AI
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Dean's List, Relevant coursework, Clubs..."
                    value={edu.achievements}
                    onChange={(e) =>
                      updateEducation(edu.id, "achievements", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Education
          </Button>
        </div>
      )}
    </div>
  )
}
