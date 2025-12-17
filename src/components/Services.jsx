import React from 'react'
import { FaHandSparkles, FaSpa, FaHands, FaEye } from 'react-icons/fa'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <FaHandSparkles />,
      title: 'Manicures',
      description: 'Classic, gel, and luxury manicure treatments for beautiful, healthy nails.',
      price: 'Starting at $25'
    },
    {
      icon: <FaHands />,
      title: 'Pedicures',
      description: 'Relaxing pedicures with exfoliation, massage, and premium nail polish.',
      price: 'Starting at $35'
    },
    {
      icon: <FaSpa />,
      title: 'Spa Treatments',
      description: 'Full body massages, facials, and rejuvenating spa experiences.',
      price: 'Starting at $60'
    },
    {
      icon: <FaEye />,
      title: 'Nail Art',
      description: 'Custom nail art designs and premium nail extensions for special occasions.',
      price: 'Starting at $40'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Premium treatments tailored to your needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <p className="service-price">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

