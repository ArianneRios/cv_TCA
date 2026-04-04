"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PersonalInfo } from "@/lib/cv-types"

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
  errors?: Record<string, string>
}

export function PersonalInfoStep({ data, onChange, errors = {} }: PersonalInfoStepProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="relative -m-6 sm:-m-8">
      {/* Dark transparent background container */}
      <div className="relative bg-foreground/95 rounded-xl p-6 sm:p-8 overflow-hidden">
        
        {/* Watermark - Logo SVG sin fondo */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.06]">
          <svg 
            viewBox="0 0 300 180" 
            className="w-[500px] h-[300px]"
            aria-hidden="true"
          >
            {/* Linea horizontal izquierda */}
            <line x1="20" y1="60" x2="95" y2="60" stroke="white" strokeWidth="1.5" />
            {/* Linea horizontal derecha */}
            <line x1="205" y1="60" x2="280" y2="60" stroke="white" strokeWidth="1.5" />
            
            {/* Chevron izquierdo (gris) */}
            <polygon points="95,60 120,35 120,45 105,60 120,75 120,85" fill="#9CA3AF" />
            
            {/* Diamante central (magenta) */}
            <polygon points="150,15 195,60 150,105 105,60" fill="#8B2346" />
            
            {/* Chevron derecho (gris) */}
            <polygon points="205,60 180,35 180,45 195,60 180,75 180,85" fill="#9CA3AF" />
            
            {/* Texto "THE CONSULTING ACADEMY" */}
            <text x="150" y="135" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" letterSpacing="3" fontWeight="400">
              THE CONSULTING ACADEMY
            </text>
            
            {/* Texto "La Paz" en cursiva */}
            <text x="210" y="155" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif" fontStyle="italic">
              La Paz
            </text>
          </svg>
        </div>
      
      <div className="relative space-y-8 text-background">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-semibold tracking-tight">
            Informacion Personal
          </h2>
          <p className="text-background/70 text-sm tracking-wide uppercase">
            Comencemos con tus datos de contacto
          </p>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-background/90 text-xs font-medium tracking-widest uppercase">
              Nombre Completo *
            </Label>
            <Input
              id="fullName"
              placeholder="Juan Perez"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base ${errors.fullName ? "border-destructive" : ""}`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-300">{errors.fullName}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-background/90 text-xs font-medium tracking-widest uppercase">
                Correo Electronico *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-red-300">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-background/90 text-xs font-medium tracking-widest uppercase">
                Telefono *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+591 7X XXX XXX"
                value={data.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base ${errors.phone ? "border-destructive" : ""}`}
              />
              {errors.phone && (
                <p className="text-sm text-red-300">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-background/90 text-xs font-medium tracking-widest uppercase">
              Direccion *
            </Label>
            <Input
              id="address"
              placeholder="Av. Principal #123, La Paz, Bolivia"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={`bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base ${errors.address ? "border-destructive" : ""}`}
            />
            {errors.address && (
              <p className="text-sm text-red-300">{errors.address}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-background/90 text-xs font-medium tracking-widest uppercase">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/juanperez"
                value={data.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-background/90 text-xs font-medium tracking-widest uppercase">
                Sitio Web Personal
              </Label>
              <Input
                id="website"
                placeholder="juanperez.com"
                value={data.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary/30 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
