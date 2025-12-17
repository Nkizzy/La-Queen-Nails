import React, { useState, useEffect, useRef } from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import './Navigation.css'

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsExpanded(false)
    }
  }

  const togglePanel = () => {
    setIsExpanded(!isExpanded)
  }

  // Sync button position with side panel center for mobile Safari stability
  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current && panelRef.current) {
        const panelRect = panelRef.current.getBoundingClientRect()
        const buttonHeight = buttonRef.current.offsetHeight
        const centerY = panelRect.top + panelRect.height / 2
        buttonRef.current.style.top = `${centerY - buttonHeight / 2}px`
      }
    }

    // Update on mount and when panel state changes
    updateButtonPosition()

    // Update on resize and scroll (for mobile Safari UI changes)
    window.addEventListener('resize', updateButtonPosition)
    window.addEventListener('orientationchange', updateButtonPosition)
    
    // Use ResizeObserver to watch for viewport changes (mobile Safari)
    const resizeObserver = new ResizeObserver(() => {
      updateButtonPosition()
    })
    
    if (panelRef.current) {
      resizeObserver.observe(document.documentElement)
    }

    return () => {
      window.removeEventListener('resize', updateButtonPosition)
      window.removeEventListener('orientationchange', updateButtonPosition)
      resizeObserver.disconnect()
    }
  }, [isExpanded])

  const navSections = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'social', label: 'Social Media' },
    { id: 'map', label: 'Map' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Backdrop overlay */}
      {isExpanded && (
        <div 
          className="nav-backdrop" 
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      {/* Arrow button - anchored to side panel position */}
      <button 
        ref={buttonRef}
        className={`nav-arrow ${isExpanded ? 'expanded' : ''}`}
        onClick={togglePanel}
        aria-label={isExpanded ? 'Close navigation' : 'Open navigation'}
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Side panel */}
      <nav ref={panelRef} className={`side-panel ${isExpanded ? 'expanded' : ''}`}>
        <div className="panel-content">
          <div className="panel-logo" onClick={() => scrollToSection('hero')}>
            <h2>La Queen Nails</h2>
          </div>
          <ul className="panel-menu">
            {navSections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section.id)
                  }}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation

