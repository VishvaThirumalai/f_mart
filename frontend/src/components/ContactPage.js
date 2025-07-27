import React, { useState, useEffect } from 'react';
import './ContactPage.css';
import MarLogo from '../assets/images/MarLogo.jpg';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';


const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    priority: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    updateBusinessHours();
        const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const updateBusinessHours = () => {
    const now = new Date();
    const day = now.getDay();
    const hoursItems = document.querySelectorAll('.hours-item');
    
    hoursItems.forEach(item => {
      item.style.background = 'transparent';
      item.style.borderRadius = '0';
    });
    
    let currentDayIndex = -1;
    if (day >= 1 && day <= 5) currentDayIndex = 0;
    else if (day === 6) currentDayIndex = 1;
    else if (day === 0) currentDayIndex = 2;
    
    if (currentDayIndex >= 0 && hoursItems[currentDayIndex]) {
      hoursItems[currentDayIndex].style.background = 'rgba(45, 212, 191, 0.1)';
      hoursItems[currentDayIndex].style.borderRadius = '12px';
      hoursItems[currentDayIndex].style.padding = '1rem';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'priority', 'subject', 'message'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = true;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = true;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        priority: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 4000);
      
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show temporary tooltip (you can implement this with state)
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getInputClassName = (fieldName) => {
    let className = 'form-control';
    if (fieldErrors[fieldName]) {
      className += ' error';
    } else if (formData[fieldName]) {
      className += ' success';
    }
    return className;
  };

  return (
    
    <div className="contact-page">
      {/* Header */}
      <Header/>    
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-shield-alt"></i>
            Trusted by 50,000+ customers
          </div>
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions about your order, need help with our app, or want to provide feedback? 
            Our dedicated support team is here to help you 24/7.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <span className="stat-number">&lt; 2min</span>
              <span className="stat-label">Average Response</span>
              <div className="stat-description">Lightning fast support</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <span className="stat-number">99.8%</span>
              <span className="stat-label">Resolution Rate</span>
              <div className="stat-description">Customer satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-headset"></i>
              </div>
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
              <div className="stat-description">Always here for you</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="form-header">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className={getInputClassName('firstName')}
                    placeholder="User First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    className={getInputClassName('lastName')}
                    placeholder="User Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className={getInputClassName('email')}
                  placeholder="user@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="User Mobile Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group priority-select">
                  <label className="form-label">Priority Level</label>
                  <select
                    name="priority"
                    className={getInputClassName('priority')}
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low - General Inquiry</option>
                    <option value="medium">Medium - Order Issue</option>
                    <option value="high">High - Urgent Support</option>
                    <option value="critical">Critical - Payment Issue</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className={getInputClassName('subject')}
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  className={getInputClassName('message')}
                  placeholder="Please describe your inquiry in detail. Include order numbers if applicable..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'loading' : ''} ${showSuccess ? 'success' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending Message...
                  </>
                ) : showSuccess ? (
                  <>
                    <i className="fas fa-check"></i>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>

              {showSuccess && (
                <div className="success-message show">
                  <i className="fas fa-check-circle"></i>
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-header">
              <h2 className="info-title">Contact Information</h2>
              <p className="info-subtitle">Multiple ways to reach our support team</p>
            </div>

            <div className="contact-card">
              <div className="card-header">
                <div className="card-icon">
                  <i className="fas fa-store"></i>
                </div>
                <div>
                  <h3 className="card-title">Visit Our Store</h3>
                  <p className="card-subtitle">Main Location</p>
                </div>
              </div>
              <div className="card-content">
                12 ,main road, chrompet<br />
                Near MIT College, Chennai 632001<br />
                <a href="https://www.google.com/maps/search/MIT+College+Chrompet+Chennai" target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-header">
                <div className="card-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h3 className="card-title">Call Us</h3>
                  <p className="card-subtitle">24/7 Support Hotline</p>
                </div>
              </div>
              <div className="card-content">
                <a 
                  href="tel:+12345678900"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard('+1 (234) 567-8900');
                  }}
                >
                  +91 1234567890
                </a><br />
                <small>Toll-free for all customers</small>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-header">
                <div className="card-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="card-title">Email Support</h3>
                  <p className="card-subtitle">Quick Response Team</p>
                </div>
              </div>
              <div className="card-content">
                <a 
                  href="mailto:support@freshmart.com"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard('support@freshmart.com');
                  }}
                >
                  freshmart@gmail.com
                </a><br />
                <small>Response within 2 hours</small>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-header">
                <div className="card-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <h3 className="card-title">Live Chat</h3>
                  <p className="card-subtitle">Instant Support</p>
                </div>
              </div>
              <div className="card-content">Available on our app and website<br />
                <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer">Start Live Chat →</a>
              </div>
            </div>
            {/* Business Hours */}
            <div className="hours-section">
              <h3 className="hours-title">
                <i className="fas fa-clock"></i>
                Business Hours
              </h3>
              <div className="hours-grid">
                <div className="hours-item">
                  <span className="hours-day">Monday - Friday</span>
                  <span className="hours-time">8:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Saturday</span>
                  <span className="hours-time">9:00 AM - 11:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Sunday</span>
                  <span className="hours-time">10:00 AM - 9:00 PM</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Support Features */}
        <div className="support-features">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h3 className="feature-title">Order Tracking</h3>
            <p className="feature-description">
              Track your orders in real-time from our warehouse to your doorstep with detailed updates.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-undo-alt"></i>
            </div>
            <h3 className="feature-title">Easy Returns</h3>
            <p className="feature-description">
              Not satisfied? We offer hassle-free returns within 7 days for fresh produce and 30 days for packaged goods.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="feature-title">Quality Guarantee</h3>
            <p className="feature-description">
              100% satisfaction guaranteed. If you're not happy with the quality, we'll make it right immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;