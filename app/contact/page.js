"use client";

import React, { useState } from "react";
import Link from "next/link";
import { schoolData } from "@/lib/school-data";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Admissions",
    studentClass: "Not Applicable",
    subject: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return "Please fill in all required fields.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.consent) {
      return "Please agree to the privacy consent.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setIsLoading(true);

    // Demo mode simulation
    setTimeout(() => {
      setIsLoading(false);
      setStatus({
        type: "success",
        message: "Demo Mode: Your inquiry has been simulated successfully. In a production environment, this would be sent to the school administration via an API route.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Admissions",
        studentClass: "Not Applicable",
        subject: "",
        message: "",
        consent: false,
      });
    }, 1500);
  };

  const [openFaq, setOpenFaq] = useState(null);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    schoolData.contact.mapQuery,
  )}`;

  const faqs = [
    {
      q: "What classes are offered at Punjab Public High School?",
      a: "We provide a comprehensive educational journey from Playgroup and Nursery through to Class 10 (Matric).",
    },
    {
      q: "How can I apply for admission?",
      a: "You can submit an enquiry through our contact form or visit the school office during working hours to collect the admission prospectus.",
    },
    {
      q: "What documents are required for registration?",
      a: "Please contact the school office for the current document checklist for your child's class. The office will confirm exactly what to bring when you enquire.",
    },
    {
      q: "What are the school timings?",
      a: `Please contact the school office on ${schoolData.contact.phone} to confirm the current timings for each grade level.`,
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="label">Get In Touch</div>
        <h1>We’re Here to Help Your Child Succeed</h1>
        <p>
          Whether you have a question about admissions, academics, or just want to
          learn more about our community, we'd love to hear from you.
        </p>
        <div className="contact-breadcrumbs">
          <Link href="/">Home</Link> / <span>Contact Us</span>
        </div>
      </section>

      {/* Contact Info Cards */}
      <div className="contact-info-grid">
        <div className="contact-card">
          <div className="icon-box">📍</div>
          <h3>Visit Our School</h3>
          <p>{schoolData.contact.address}</p>
        </div>
        <div className="contact-card">
          <div className="icon-box">📞</div>
          <h3>Call Us</h3>
          <p>
            <a href={`tel:${schoolData.contact.phoneInternational}`}>
              {schoolData.contact.phone}
            </a>
          </p>
        </div>
        <div className="contact-card">
          <div className="icon-box">✉️</div>
          <h3>Email Us</h3>
          <p className="break-all">
            <a href={`mailto:${schoolData.contact.email}`}>
              {schoolData.contact.email}
            </a>
          </p>
        </div>
        <div className="contact-card">
          <div className="icon-box">⏰</div>
          <h3>School Hours</h3>
          <p>Please contact the school office to confirm current timings.</p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="contact-main-section">
        {/* Form */}
        <div className="contact-form-container">
          <h2>Send an Inquiry</h2>
          <p>Fill out the form below and our administration will get back to you shortly.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Student/Parent Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="John Doe"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="email@example.com"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="+92 ..."
                  required 
                />
              </div>
              <div className="form-group">
                <label>Inquiry Type</label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange}>
                  <option value="Admissions">Admissions</option>
                  <option value="Fee Information">Fee Information</option>
                  <option value="Academics">Academics</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Student Class</label>
                <select name="studentClass" value={formData.studentClass} onChange={handleInputChange}>
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Playgroup">Playgroup</option>
                  <option value="Nursery">Nursery</option>
                  <option value="Prep">Prep</option>
                  <option value="Class 1-5">Class 1–5</option>
                  <option value="Class 6-8">Class 6–8</option>
                  <option value="Class 9-10">Class 9–10 (Matric)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  placeholder="Brief subject" 
                />
              </div>
              <div className="form-group full-width">
                <label>Message *</label>
                <textarea 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="How can we help you?"
                  required 
                />
              </div>
            </div>

            <div className="form-checkbox">
              <input 
                type="checkbox" 
                name="consent" 
                id="consent" 
                checked={formData.consent} 
                onChange={handleInputChange} 
              />
              <label htmlFor="consent">
                I consent to Punjab Public High School collecting my information to respond to this inquiry.
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Submit Inquiry"}
            </button>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Side Panel */}
        <div className="contact-side-panel">
          <div className="location-card">
            <h3>Our Location</h3>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                schoolData.contact.mapQuery,
              )}&output=embed`}
              title="Map showing Punjab Public High School, Shaheenabad"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                height: 230,
                border: 0,
                borderRadius: 16,
                marginBottom: "1.25rem",
              }}
            />
            <p style={{ marginBottom: "1.25rem" }}>{schoolData.contact.address}</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{ display: "block", textAlign: "center" }}
            >
              Open in Google Maps
            </a>
          </div>

          <div className="location-card" style={{ background: 'var(--pphs-navy)', color: 'white' }}>
            <h3 style={{ color: 'var(--pphs-gold)' }}>Need Quick Help?</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Call our administrative office at{" "}
              <a
                href={`tel:${schoolData.contact.phoneInternational}`}
                style={{ color: 'var(--pphs-gold)', fontWeight: 600 }}
              >
                {schoolData.contact.phone}
              </a>{" "}
              or email us at{" "}
              <a
                href={`mailto:${schoolData.contact.email}`}
                style={{ color: 'var(--pphs-gold)', fontWeight: 600, wordBreak: 'break-all' }}
              >
                {schoolData.contact.email}
              </a>
              . Visit us at {schoolData.contact.address} for immediate assistance.
            </p>
            <Link href="/admissions" className="cta-btn" style={{ backgroundColor: 'var(--pphs-gold)', color: 'var(--pphs-navy)' }}>
              Explore Admissions
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-grid">
          <div className="faq-content">
            <h2>Common Questions</h2>
            <p>Find quick answers to frequently asked questions. If you can't find what you're looking for, feel free to use the contact form.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.q}
                  <span>{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Planning Your Child’s Future?</h2>
          <p>
            Join a community dedicated to academic excellence and character building. 
            We guide students from their first steps to Matric success.
          </p>
          <Link href="/admissions" className="cta-btn">
            Start Admission Process
          </Link>
        </div>
      </section>
    </div>
  );
}
