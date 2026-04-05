"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateSelectorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showPresent?: boolean
}

const MONTHS = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}))

function parseDate(value: string): { month: string; year: string } {
  if (!value || value === "Presente") {
    return { month: "", year: "" }
  }
  
  // Try to parse "MMM YYYY" or "YYYY-MM" formats
  const parts = value.split(/[\s-\/]/)
  if (parts.length >= 2) {
    // Check if first part is a month name
    const monthNames: Record<string, string> = {
      "ene": "01", "enero": "01",
      "feb": "02", "febrero": "02",
      "mar": "03", "marzo": "03",
      "abr": "04", "abril": "04",
      "may": "05", "mayo": "05",
      "jun": "06", "junio": "06",
      "jul": "07", "julio": "07",
      "ago": "08", "agosto": "08",
      "sep": "09", "septiembre": "09",
      "oct": "10", "octubre": "10",
      "nov": "11", "noviembre": "11",
      "dic": "12", "diciembre": "12",
      "jan": "01", "january": "01",
      "feb": "02", "february": "02",
      "mar": "03", "march": "03",
      "apr": "04", "april": "04",
      "may": "05",
      "jun": "06", "june": "06",
      "jul": "07", "july": "07",
      "aug": "08", "august": "08",
      "sep": "09", "september": "09",
      "oct": "10", "october": "10",
      "nov": "11", "november": "11",
      "dec": "12", "december": "12",
    }
    
    const firstPart = parts[0].toLowerCase()
    if (monthNames[firstPart]) {
      return { month: monthNames[firstPart], year: parts[1] }
    }
    
    // Try YYYY-MM format
    if (parts[0].length === 4 && !isNaN(Number(parts[0]))) {
      return { year: parts[0], month: parts[1].padStart(2, "0") }
    }
  }
  
  return { month: "", year: "" }
}

function formatDate(month: string, year: string): string {
  if (!month || !year) return ""
  
  const monthLabel = MONTHS.find(m => m.value === month)?.label || ""
  const shortMonth = monthLabel.substring(0, 3).toLowerCase()
  return `${shortMonth} ${year}`
}

export function DateSelector({ 
  value, 
  onChange, 
  placeholder = "Seleccionar", 
  showPresent = false 
}: DateSelectorProps) {
  const { month, year } = parseDate(value)
  const isPresent = value === "Presente"

  const handleMonthChange = (newMonth: string) => {
    if (newMonth === "present") {
      onChange("Presente")
      return
    }
    const formatted = formatDate(newMonth, year)
    onChange(formatted)
  }

  const handleYearChange = (newYear: string) => {
    const formatted = formatDate(month, newYear)
    onChange(formatted)
  }

  return (
    <div className="flex gap-2">
      <Select 
        value={isPresent ? "present" : month} 
        onValueChange={handleMonthChange}
      >
        <SelectTrigger className="flex-1 h-10 rounded-lg bg-background border-input">
          <SelectValue placeholder="Mes" />
        </SelectTrigger>
        <SelectContent>
          {showPresent && (
            <SelectItem value="present" className="font-medium text-primary">
              Presente
            </SelectItem>
          )}
          {MONTHS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={year} 
        onValueChange={handleYearChange}
        disabled={isPresent}
      >
        <SelectTrigger className="w-[100px] h-10 rounded-lg bg-background border-input">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((y) => (
            <SelectItem key={y.value} value={y.value}>
              {y.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
