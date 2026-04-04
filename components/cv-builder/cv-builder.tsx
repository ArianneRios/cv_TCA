"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { StepIndicator } from "./step-indicator"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { EducationStep } from "./steps/education-step"
import { ExperienceStep } from "./steps/experience-step"
import { LeadershipStep } from "./steps/leadership-step"
import { SkillsStep } from "./steps/skills-step"
import { PreviewStep } from "./steps/preview-step"
import { CVTemplate } from "./cv-templates"
import { type CVData, initialCVData } from "@/lib/cv-types"
import { ChevronLeft, ChevronRight, FileText, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

const steps = [
  { id: 1, name: "Personal Info", shortName: "Personal" },
  { id: 2, name: "Education", shortName: "Education" },
  { id: 3, name: "Experience", shortName: "Experience" },
  { id: 4, name: "Leadership", shortName: "Leadership" },
  { id: 5, name: "Skills", shortName: "Skills" },
  { id: 6, name: "Preview", shortName: "Preview" },
]

type ValidationErrors = Record<string, string>

export function CVBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvData, setCVData] = useState<CVData>(initialCVData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [showLivePreview, setShowLivePreview] = useState(false)

  const validatePersonalInfo = (): boolean => {
    const newErrors: ValidationErrors = {}
    
    if (!cvData.personalInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    
    if (!cvData.personalInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.personalInfo.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!cvData.personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }
    
    if (!cvData.personalInfo.address.trim()) {
      newErrors.address = "Address is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goToNextStep = () => {
    // Validate personal info before proceeding
    if (currentStep === 1 && !validatePersonalInfo()) {
      return
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    setErrors({})
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={cvData.personalInfo}
            onChange={(personalInfo) => setCVData({ ...cvData, personalInfo })}
            errors={errors}
          />
        )
      case 2:
        return (
          <EducationStep
            data={cvData.education}
            onChange={(education) => setCVData({ ...cvData, education })}
          />
        )
      case 3:
        return (
          <ExperienceStep
            data={cvData.experience}
            onChange={(experience) => setCVData({ ...cvData, experience })}
          />
        )
      case 4:
        return (
          <LeadershipStep
            data={cvData.leadership}
            onChange={(leadership) => setCVData({ ...cvData, leadership })}
          />
        )
      case 5:
        return (
          <SkillsStep
            data={cvData.skills}
            onChange={(skills) => setCVData({ ...cvData, skills })}
          />
        )
      case 6:
        return <PreviewStep data={cvData} onEditSection={goToStep} />
      default:
        return null
    }
  }

  // Check if CV has any content for live preview
  const hasContent = useMemo(() => {
    return (
      cvData.personalInfo.fullName ||
      cvData.education.length > 0 ||
      cvData.experience.length > 0 ||
      cvData.leadership.length > 0 ||
      cvData.skills.length > 0
    )
  }, [cvData])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-primary flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="h-8 w-8">
                  {/* Diamond shape inspired by the logo */}
                  <polygon points="20,5 35,20 20,35 5,20" fill="currentColor" className="text-primary-foreground" />
                  <polygon points="3,20 12,20 8,16 8,24" fill="currentColor" className="text-secondary opacity-80" />
                  <polygon points="37,20 28,20 32,16 32,24" fill="currentColor" className="text-secondary opacity-80" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif font-semibold text-foreground leading-tight tracking-tight">CV Builder</h1>
                <p className="text-xs text-muted-foreground tracking-wide">The Consulting Academy</p>
              </div>
              <h1 className="text-lg font-serif font-semibold text-foreground sm:hidden">CV Builder</h1>
            </div>
            
            {/* Live Preview Toggle - Only show on non-preview steps */}
            {currentStep !== 6 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="gap-2 hidden lg:flex"
              >
                {showLivePreview ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Live Preview
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <StepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className={`${showLivePreview && currentStep !== 6 ? "grid lg:grid-cols-2 gap-8" : ""}`}>
          {/* Form Section */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={goToNextStep} className="gap-2">
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Download CV
                </Button>
              )}
            </div>
          </div>

          {/* Live Preview Panel */}
          {showLivePreview && currentStep !== 6 && (
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Live Preview</h3>
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
                  {hasContent ? (
                    <div className="scale-[0.75] origin-top-left w-[133.33%]">
                      <CVTemplate data={cvData} template="harvard" />
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <p>Start filling in your details to see a live preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
