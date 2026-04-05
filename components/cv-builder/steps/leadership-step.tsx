"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker"
import type { Leadership } from "@/lib/cv-types"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface LeadershipStepProps {
  data: Leadership[]
  onChange: (data: Leadership[]) => void
}

const AI_SUGGESTIONS = [
  "• Organice y lidere talleres semanales con 50+ asistentes, enfocados en desarrollo profesional\n• Gestione un equipo de 10 oficiales para ejecutar 15+ eventos durante el ano academico\n• Aumente la membresia en 40% a traves de iniciativas estrategicas de alcance y engagement",
  "• Coordine proyectos de servicio comunitario beneficiando a 500+ residentes locales\n• Desarrolle alianzas con 5 empresas locales para asegurar patrocinios\n• Cree programa de mentoria conectando 30 estudiantes con profesionales de la industria",
  "• Funde y crecí una organizacion estudiantil de 0 a 100+ miembros activos\n• Asegure $5,000 en financiamiento a traves de aplicaciones de becas y eventos de recaudacion\n• Represente a la organizacion en reuniones de directivos y conferencias universitarias",
]

export function LeadershipStep({ data, onChange }: LeadershipStepProps) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null)
  const [currentlyActive, setCurrentlyActive] = useState<Record<string, boolean>>({})

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
    setCurrentlyActive((prev) => {
      const newState = { ...prev }
      delete newState[id]
      return newState
    })
  }

  const updateLeadership = (id: string, field: keyof Leadership, value: string) => {
    onChange(
      data.map((lead) =>
        lead.id === id ? { ...lead, [field]: value } : lead
      )
    )
  }

  const handleCurrentlyActiveChange = (id: string, checked: boolean) => {
    setCurrentlyActive((prev) => ({ ...prev, [id]: checked }))
    if (checked) {
      updateLeadership(id, "endDate", "Presente")
    } else {
      updateLeadership(id, "endDate", "")
    }
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
        <h2 className="text-2xl font-semibold text-foreground">Liderazgo y Actividades</h2>
        <p className="text-muted-foreground mt-1">
          Agrega roles de liderazgo, voluntariado o actividades extracurriculares.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No has agregado actividades de liderazgo aun</p>
          <Button onClick={addLeadership} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Liderazgo
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
                  Actividad {index + 1}
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
                    <Label>Organizacion *</Label>
                    <Input
                      placeholder="Club de Ciencias de la Computacion"
                      value={lead.organization}
                      onChange={(e) =>
                        updateLeadership(lead.id, "organization", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rol *</Label>
                    <Input
                      placeholder="Presidente"
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
                    <CalendarDatePicker
                      value={lead.startDate}
                      onChange={(value) =>
                        updateLeadership(lead.id, "startDate", value)
                      }
                      placeholder="Seleccionar fecha"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Fin</Label>
                    <CalendarDatePicker
                      value={lead.endDate}
                      onChange={(value) =>
                        updateLeadership(lead.id, "endDate", value)
                      }
                      placeholder="Seleccionar fecha"
                      disabled={currentlyActive[lead.id]}
                      showCurrentlyHere
                      currentlyHereLabel="Actualmente activo aqui"
                      isCurrentlyHere={currentlyActive[lead.id] || false}
                      onCurrentlyHereChange={(checked) =>
                        handleCurrentlyActiveChange(lead.id, checked)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Descripcion</Label>
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
                      Mejorar con IA
                    </Button>
                  </div>
                  <Textarea
                    placeholder="• Organice talleres semanales con 50+ asistentes&#10;• Gestione un equipo de 10 oficiales&#10;• Aumente la membresia del club en 40%"
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
            Agregar Otra Actividad
          </Button>
        </div>
      )}
    </div>
  )
}
