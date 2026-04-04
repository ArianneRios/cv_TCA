"use client"

interface TCALogoProps {
  className?: string
  showText?: boolean
  variant?: "full" | "icon"
}

export function TCALogo({ className = "", showText = true, variant = "full" }: TCALogoProps) {
  if (variant === "icon") {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        aria-label="The Consulting Academy Logo"
      >
        {/* Chevron izquierdo (gris) */}
        <polygon points="15,50 35,30 35,38 25,50 35,62 35,70" fill="#6B7280" />
        
        {/* Diamante central (magenta) */}
        <polygon points="50,10 85,50 50,90 15,50" fill="#8B2346" />
        
        {/* Chevron derecho (gris) */}
        <polygon points="85,50 65,30 65,38 75,50 65,62 65,70" fill="#6B7280" />
      </svg>
    )
  }

  return (
    <svg 
      viewBox="0 0 320 200" 
      className={className}
      aria-label="The Consulting Academy La Paz Logo"
    >
      {/* Linea horizontal izquierda */}
      <line x1="10" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {/* Linea horizontal derecha */}
      <line x1="220" y1="70" x2="310" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      
      {/* Chevron izquierdo (gris) */}
      <polygon points="100,70 130,40 130,52 112,70 130,88 130,100" fill="#6B7280" />
      
      {/* Diamante central (magenta) */}
      <polygon points="160,15 210,70 160,125 110,70" fill="#8B2346" />
      
      {/* Chevron derecho (gris) */}
      <polygon points="220,70 190,40 190,52 208,70 190,88 190,100" fill="#6B7280" />
      
      {showText && (
        <>
          {/* Linea decorativa bajo el diamante */}
          <line x1="60" y1="140" x2="260" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          
          {/* Texto "THE CONSULTING ACADEMY" */}
          <text 
            x="160" 
            y="165" 
            textAnchor="middle" 
            fill="currentColor" 
            fontSize="18" 
            fontFamily="'Times New Roman', Georgia, serif" 
            letterSpacing="4"
            fontWeight="400"
          >
            THE CONSULTING ACADEMY
          </text>
          
          {/* Texto "La Paz" en cursiva */}
          <text 
            x="230" 
            y="188" 
            textAnchor="middle" 
            fill="currentColor" 
            fontSize="16" 
            fontFamily="'Times New Roman', Georgia, serif" 
            fontStyle="italic"
            opacity="0.9"
          >
            La Paz
          </text>
        </>
      )}
    </svg>
  )
}
