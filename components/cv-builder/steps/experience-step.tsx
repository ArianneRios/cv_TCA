"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker"
import type { Experience } from "@/lib/cv-types"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface ExperienceStepProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

const AI_SUGGESTIONS = [
  "• Lidere un equipo multifuncional de 8 ingenieros para entregar una nueva funcionalidad que aumento el engagement de usuarios en 35%\n• Arquitecte e implemente una solucion de microservicios que redujo la latencia del sistema en 60%\n• Mentorie a 3 desarrolladores junior a traves de revisiones de codigo y sesiones de pair programming",
  "• Lideré la migracion de sistemas legacy a infraestructura cloud, resultando en 40% de reduccion de costos\n• Desarrolle y mantuve APIs RESTful sirviendo mas de 10M de solicitudes diarias\n• Colabore con product managers para definir requerimientos tecnicos y cronogramas de proyecto",
  "• Construi un framework de testing automatizado que mejoro la cobertura de codigo del 45% al 92%\n• Optimice consultas de base de datos resultando en 50% de mejora en tiempos de carga\n• Presente propuestas tecnicas a stakeholders y asegure aprobacion para iniciativas importantes",
]

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null)
  const [currentlyWorking, setCurrentlyWorking] = useState<Record<string, boolean>>({})

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
    setCurrentlyWorking((prev) => {
      const newState = { ...prev }
      delete newState[id]
      return newState
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    )
  }

  const handleCurrentlyWorkingChange = (id: string, checked: boolean) => {
    setCurrentlyWorking((prev) => ({ ...prev, [id]: checked }))
    if (checked) {
      updateExperience(id, "endDate", "Presente")
    } else {
      updateExperience(id, "endDate", "")
    }
  }

  const handleAIImprove = (id: string) => {
    setLoadingAI(id)
    setTimeout(() => {
      const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)]
      updateExperience(id, "description", randomSuggestion)
      setLoadingAI(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Experiencia</h2>
        <p className="text-muted-foreground mt-1">
          Agrega tu experiencia laboral, comenzando por la posicion mas reciente.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No has agregado experiencia aun</p>
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Experiencia
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
                  Experiencia {index + 1}
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
                    <Label>Empresa *</Label>
                    <Input
                      placeholder="Google"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Posicion *</Label>
                    <Input
                      placeholder="Ingeniero de Software"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ubicacion</Label>
                  <Input
                    placeholder="Ciudad de Mexico, Mexico"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha Inicio</Label>
                    <CalendarDatePicker
                      value={exp.startDate}
                      onChange={(value) =>
                        updateExperience(exp.id, "startDate", value)
                      }
                      placeholder="Seleccionar fecha"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Fin</Label>
                    <CalendarDatePicker
                      value={exp.endDate}
                      onChange={(value) =>
                        updateExperience(exp.id, "endDate", value)
                      }
                      placeholder="Seleccionar fecha"
                      disabled={currentlyWorking[exp.id]}
                      showCurrentlyHere
                      currentlyHereLabel="Actualmente trabajo aqui"
                      isCurrentlyHere={currentlyWorking[exp.id] || false}
                      onCurrentlyHereChange={(checked) =>
                        handleCurrentlyWorkingChange(exp.id, checked)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Descripcion *</Label>
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
                      Mejorar con IA
                    </Button>
                  </div>
                  <Textarea
                    placeholder="• Lidere el desarrollo de nuevas funcionalidades que aumentaron el engagement de usuarios en 25%&#10;• Colabore con equipos multifuncionales para entregar proyectos a tiempo&#10;• Mentorie a desarrolladores junior y realice revisiones de codigo"
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
            Agregar Otra Experiencia
          </Button>
        </div>
      )}
    </div>
  )
}
