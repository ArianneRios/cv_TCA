"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CalendarDatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  showCurrentlyHere?: boolean
  currentlyHereLabel?: string
  isCurrentlyHere?: boolean
  onCurrentlyHereChange?: (checked: boolean) => void
}

export function CalendarDatePicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  disabled = false,
  showCurrentlyHere = false,
  currentlyHereLabel = "Actualmente aqui",
  isCurrentlyHere = false,
  onCurrentlyHereChange,
}: CalendarDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Parse the value to a Date object
  const parseValue = (val: string): Date | undefined => {
    if (!val || val === "Presente") return undefined
    
    // Try parsing different formats
    const formats = ["MMM yyyy", "MMMM yyyy", "MM/yyyy", "yyyy-MM"]
    for (const fmt of formats) {
      const parsed = parse(val, fmt, new Date(), { locale: es })
      if (isValid(parsed)) return parsed
    }
    
    // Try direct Date parsing
    const directParse = new Date(val)
    if (isValid(directParse)) return directParse
    
    return undefined
  }

  const selectedDate = parseValue(value)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = format(date, "MMM yyyy", { locale: es })
      const capitalizedMonth = formatted.charAt(0).toUpperCase() + formatted.slice(1)
      onChange(capitalizedMonth)
      setOpen(false)
    }
  }

  const handleCurrentlyHereChange = (checked: boolean) => {
    if (onCurrentlyHereChange) {
      onCurrentlyHereChange(checked)
    }
    if (checked) {
      onChange("Presente")
    } else {
      onChange("")
    }
  }

  const displayValue = isCurrentlyHere ? "Presente" : value

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              "border-input bg-background hover:bg-accent/50",
              "shadow-sm transition-all duration-200",
              !displayValue && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled || isCurrentlyHere}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {displayValue || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 shadow-lg border border-border/50 rounded-xl" 
          align="start"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            startMonth={new Date(1980, 0)}
            endMonth={new Date(2030, 11)}
            defaultMonth={selectedDate || new Date()}
            className="rounded-xl"
          />
        </PopoverContent>
      </Popover>
      
      {showCurrentlyHere && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="currently-here"
            checked={isCurrentlyHere}
            onCheckedChange={handleCurrentlyHereChange}
            className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label
            htmlFor="currently-here"
            className="text-sm text-muted-foreground cursor-pointer select-none"
          >
            {currentlyHereLabel}
          </label>
        </div>
      )}
    </div>
  )
}
