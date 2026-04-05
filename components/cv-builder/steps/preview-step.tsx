"use client"

import { Button } from "@/components/ui/button"
import type { CVData } from "@/lib/cv-types"
import { CVTemplate, type TemplateType } from "../cv-templates"
import { Download, FileText, Pencil, Save } from "lucide-react"
import { useState, useRef } from "react"

interface PreviewStepProps {
  data: CVData
  onEditSection?: (step: number) => void
}

const templates: { id: TemplateType; name: string }[] = [
  { id: "harvard", name: "Harvard" },
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
]

export function PreviewStep({ data, onEditSection }: PreviewStepProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("harvard")
  const [saving, setSaving] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  const handleSaveProgress = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert("Progreso guardado! (Demo only)")
    }, 1000)
  }

  const handleExportPDF = () => {
    // Use browser's native print functionality to save as PDF
    const printWindow = window.open('', '_blank')
    if (!printWindow || !cvRef.current) return

    const cvContent = cvRef.current.innerHTML
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${data.personalInfo.fullName || 'Mi CV'}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Times New Roman', Times, serif;
              background: white;
              color: black;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${cvContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleExportDOCX = () => {
    alert("Exportar DOCX - Proximamente!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Vista Previa de tu CV</h2>
          <p className="text-muted-foreground mt-1">
            {"Revisa tu CV y descargalo cuando estes listo."}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveProgress}
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? "Guardando..." : "Guardar Progreso"}
        </Button>
      </div>

      {/* Template Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Plantilla:</span>
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedTemplate === template.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleExportPDF} 
          variant="default" 
          size="sm" 
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          Descargar PDF
        </Button>
        <Button onClick={handleExportDOCX} variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar DOCX
        </Button>
      </div>

      {/* CV Preview with Edit Buttons */}
      <div className="relative bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Section Edit Buttons */}
        {onEditSection && (
          <div className="absolute right-4 top-4 flex flex-col gap-2 z-10 print:hidden">
            <EditButton label="Personal" onClick={() => onEditSection(1)} />
            <EditButton label="Educacion" onClick={() => onEditSection(2)} />
            <EditButton label="Experiencia" onClick={() => onEditSection(3)} />
            <EditButton label="Liderazgo" onClick={() => onEditSection(4)} />
            <EditButton label="Habilidades" onClick={() => onEditSection(5)} />
          </div>
        )}
        
        <div ref={cvRef} id="cv-preview" className="bg-white">
          <CVTemplate data={data} template={selectedTemplate} />
        </div>
      </div>
    </div>
  )
}

function EditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      className="h-7 text-xs gap-1 opacity-70 hover:opacity-100"
    >
      <Pencil className="h-3 w-3" />
      {label}
    </Button>
  )
}
