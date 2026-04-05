"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import type { Leadership } from "@/lib/cv-types"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface LeadershipStepProps {
  data: Leadership[]
  onChange: (data: Leadership[]) => void
}

const AI_SUGGESTIONS = [
  "• Organized and led weekly workshops with 50+ attendees, focusing on professional development\n• Managed a team of 10 officers to execute 15+ events throughout the academic year\n• Increased membership by 40% through strategic outreach and engagement initiatives",
  "• Coordinated community service projects benefiting 500+ local residents\n• Developed partnerships with 5 local businesses to secure sponsorships\n• Created mentorship program pairing 30 students with industry professionals",
  "• Founded and grew student organization from 0 to 100+ active members\n• Secured $5,000 in funding through grant applications and fundraising events\n• Represented organization at university board meetings and conferences",
]

export function LeadershipStep({ data, onChange }: LeadershipStepProps) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null)

  const addLeadership = () => {
    const newLeadership: Leadership = {
      id: crypto.randomUUID(),
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange([...data, newLeadership])
  }

  const removeLeadership = (id: string) => {
    onChange(data.filter((lead) => lead.id !== id))
  }

  const updateLeadership = (id: string, field: keyof Leadership, value: string) => {
    onChange(
      data.map((lead) =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
    )
  }

  const handleAIImprove = (id: string) => {
    setLoadingAI(id)
    setTimeout(() => {
      const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)]
      updateLeadership(id, "description", randomSuggestion)
      setLoadingAI(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Leadership & Activities</h2>
        <p className="text-muted-foreground mt-1">
          Add leadership roles, volunteer work, or extracurricular activities.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No leadership activities added yet</p>
          <Button onClick={addLeadership} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Leadership
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((lead, index) => (
            <div
              key={lead.id}
              className="relative border border-border rounded-lg p-5 bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Activity {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeLeadership(lead.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Organization *</Label>
                    <Input
                      placeholder="Computer Science Club"
                      value={lead.organization}
                      onChange={(e) =>
                        updateLeadership(lead.id, "organization", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Input
                      placeholder="President"
                      value={lead.role}
                      onChange={(e) =>
                        updateLeadership(lead.id, "role", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha Inicio</Label>
                    <DatePicker
                      placeholder="Seleccionar fecha"
                      value={lead.startDate}
                      onChange={(value) =>
                        updateLeadership(lead.id, "startDate", value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Fin</Label>
                    <DatePicker
                      placeholder="Seleccionar fecha"
                      value={lead.endDate}
                      onChange={(value) =>
                        updateLeadership(lead.id, "endDate", value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Description</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAIImprove(lead.id)}
                      disabled={loadingAI === lead.id}
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      {loadingAI === lead.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      Improve with AI
                    </Button>
                  </div>
                  <Textarea
                    placeholder="• Organized weekly workshops with 50+ attendees&#10;• Managed a team of 10 officers&#10;• Increased club membership by 40%"
                    value={lead.description}
                    onChange={(e) =>
                      updateLeadership(lead.id, "description", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addLeadership} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Activity
          </Button>
        </div>
      )}
    </div>
  )
}
