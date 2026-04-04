"use client"

import { Button } from "@/components/ui/button"
import type { CVData } from "@/lib/cv-types"
import { CVTemplate, type TemplateType } from "../cv-templates"
import { Download, FileText, Pencil, Save } from "lucide-react"
import { useState } from "react"

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

  const handleSaveProgress = () => {
    setSaving(true)
    // Simulate save (UI only)
    setTimeout(() => {
      setSaving(false)
      alert("Progress saved! (Demo only)")
    }, 1000)
  }

  const handleExportPDF = () => {
    alert("PDF export coming soon! (Demo only)")
  }

  const handleExportDOCX = () => {
    alert("DOCX export coming soon! (Demo only)")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Preview Your CV</h2>
          <p className="text-muted-foreground mt-1">
            {"Review your CV and export when ready."}
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
          {saving ? "Saving..." : "Save Progress"}
        </Button>
      </div>

      {/* Template Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Template:</span>
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
        <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Export PDF
        </Button>
        <Button onClick={handleExportDOCX} variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export DOCX
        </Button>
      </div>

      {/* CV Preview with Edit Buttons */}
      <div className="relative bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Section Edit Buttons */}
        {onEditSection && (
          <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
            <EditButton label="Personal" onClick={() => onEditSection(1)} />
            <EditButton label="Education" onClick={() => onEditSection(2)} />
            <EditButton label="Experience" onClick={() => onEditSection(3)} />
            <EditButton label="Leadership" onClick={() => onEditSection(4)} />
            <EditButton label="Skills" onClick={() => onEditSection(5)} />
          </div>
        )}
        
        <CVTemplate data={data} template={selectedTemplate} />
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
