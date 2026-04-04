"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface AIImproveButtonProps {
  onImprove: () => void
  disabled?: boolean
}

export function AIImproveButton({ onImprove, disabled }: AIImproveButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    // Simulate AI improvement (UI only)
    setTimeout(() => {
      onImprove()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className="h-7 text-xs gap-1.5 text-primary/70 hover:text-primary hover:bg-accent"
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      Improve with AI
    </Button>
  )
}
