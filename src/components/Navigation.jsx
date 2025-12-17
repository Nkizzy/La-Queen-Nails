import React, { useState } from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import './Navigation.css'

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false)

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
      
      {/* Arrow button - always visible */}
      <button 
        className={`nav-arrow ${isExpanded ? 'expanded' : ''}`}
        onClick={togglePanel}
        aria-label={isExpanded ? 'Close navigation' : 'Open navigation'}
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Side panel */}
      <nav className={`side-panel ${isExpanded ? 'expanded' : ''}`}>
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

