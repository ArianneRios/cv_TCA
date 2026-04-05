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
    // Simulate save (UI only)
    setTimeout(() => {
      setSaving(false)
      alert("Progreso guardado! (Demo only)")
    }, 1000)
  }

  const handleExportPDF = () => {
    // Create a new window with only the CV content for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow || !cvRef.current) return

    const cvContent = cvRef.current.innerHTML
    const fileName = data.personalInfo.fullName 
      ? `CV - ${data.personalInfo.fullName}`
      : "Mi CV"

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Times New Roman', Times, serif;
              line-height: 1.4;
              color: #000;
              background: #fff;
              padding: 0;
              margin: 0;
            }
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            .cv-container {
              max-width: 21cm;
              margin: 0 auto;
              padding: 1.5cm;
              background: white;
            }
            h1 { font-size: 24px; font-weight: bold; margin-bottom: 4px; }
            h2 { font-size: 14px; font-weight: bold; border-bottom: 1px solid #000; margin: 16px 0 8px; padding-bottom: 2px; text-transform: uppercase; }
            h3 { font-size: 12px; font-weight: bold; margin-bottom: 2px; }
            p, li, span { font-size: 11px; }
            ul { padding-left: 16px; margin: 4px 0; }
            li { margin-bottom: 2px; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-sm { font-size: 11px; }
            .text-xs { font-size: 10px; }
            .text-lg { font-size: 14px; }
            .text-xl { font-size: 16px; }
            .text-2xl { font-size: 20px; }
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-4 { margin-bottom: 16px; }
            .mt-2 { margin-top: 8px; }
            .mt-4 { margin-top: 16px; }
            .space-y-1 > * + * { margin-top: 4px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .space-y-4 > * + * { margin-top: 16px; }
            .flex { display: flex; }
            .flex-wrap { flex-wrap: wrap; }
            .gap-1 { gap: 4px; }
            .gap-2 { gap: 8px; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .items-center { align-items: center; }
            .border-b { border-bottom: 1px solid #000; }
            .pb-1 { padding-bottom: 4px; }
            .italic { font-style: italic; }
            .text-muted-foreground { color: #666; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
            .list-disc { list-style-type: disc; }
            .bg-muted { background-color: #f5f5f5; }
            .rounded { border-radius: 4px; }
            .px-2 { padding-left: 8px; padding-right: 8px; }
            .py-1 { padding-top: 4px; padding-bottom: 4px; }
          </style>
        </head>
        <body>
          <div class="cv-container">
            ${cvContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
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
        
        <div ref={cvRef} className="bg-white">
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
