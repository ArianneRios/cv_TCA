"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  name: string
  shortName: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      {/* Mobile view - simplified */}
      <div className="flex md:hidden items-center justify-between px-2">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">
          {steps[currentStep - 1]?.name}
        </span>
      </div>
      
      {/* Desktop view - full steps */}
      <ol className="hidden md:flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          
          return (
            <li
              key={step.id}
              className={cn(
                "flex items-center",
                index !== steps.length - 1 && "flex-1"
              )}
            >
              <button
                onClick={() => onStepClick?.(step.id)}
                className="flex items-center gap-3 group"
                type="button"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background text-muted-foreground",
                    onStepClick && "group-hover:border-primary/70"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap transition-colors",
                    isCurrent && "text-foreground",
                    !isCurrent && "text-muted-foreground",
                    onStepClick && "group-hover:text-foreground"
                  )}
                >
                  {step.name}
                </span>
              </button>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] flex-1 mx-4 transition-colors",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
      
      {/* Mobile progress bar */}
      <div className="md:hidden mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </nav>
  )
}
