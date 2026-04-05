"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = "Seleccionar fecha", className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Parse the string value to Date object if it's in "MMM yyyy" format
  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined
    
    // Try parsing different formats
    const formats = ["MMM yyyy", "MMMM yyyy", "MM/yyyy", "yyyy-MM"]
    for (const fmt of formats) {
      const parsed = parse(dateString, fmt, new Date(), { locale: es })
      if (isValid(parsed)) return parsed
    }
    
    // Try English parsing
    for (const fmt of formats) {
      const parsed = parse(dateString, fmt, new Date())
      if (isValid(parsed)) return parsed
    }
    
    return undefined
  }

  const date = parseDate(value || "")

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && onChange) {
      // Format as "MMM yyyy" (e.g., "Sep 2023")
      const formatted = format(selectedDate, "MMM yyyy", { locale: es })
      onChange(formatted)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={1950}
          toYear={2050}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}
