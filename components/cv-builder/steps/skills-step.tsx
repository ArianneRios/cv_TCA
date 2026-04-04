"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Plus, X } from "lucide-react"

interface SkillsStepProps {
  data: string[]
  onChange: (data: string[]) => void
}

const suggestedSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
  "SQL",
  "Git",
  "Node.js",
  "AWS",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Project Management",
]

export function SkillsStep({ data, onChange }: SkillsStepProps) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed])
    }
    setInputValue("")
  }

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(inputValue)
    }
  }

  const availableSuggestions = suggestedSkills.filter((s) => !data.includes(s))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
        <p className="text-muted-foreground mt-1">
          Add your technical and soft skills. Type a skill and press Enter to add.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a skill and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addSkill(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-primary-foreground/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {availableSuggestions.length > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Suggested skills:</p>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-accent transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
