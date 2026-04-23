"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [formMessage, setFormMessage] = useState({ text: '', color: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scrolling for hash links
    const handleHashLinkClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId.startsWith('/#')) {
        const id = targetId.substring(2);
        const targetElement = document.getElementById(id);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          // Update URL hash without jumping
          window.history.pushState(null, '', `#${id}`);
        }
      }
    };

    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
      anchor.addEventListener('click', handleHashLinkClick);
    });

    return () => {
      document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleHashLinkClick);
      });
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ text: 'Sending...', color: 'var(--text-dark)' });

    setTimeout(() => {
      setFormMessage({ text: "Thanks for joining! We'll be in touch soon.", color: "var(--accent-green)" });
      setIsSubmitting(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text fade-in-up">
            <div className="badge">Early Access Prototype</div>
            <h1>Make your neighborhood <span className="highlight">safer, together.</span></h1>
            <p>StreetSense empowers you to report local issues, track their progress, and see the real impact you're making in your community.</p>
            <div className="hero-actions">
              <a href="/#cta" className="btn btn-primary btn-large">Get Started</a>
              <a href="/#features" className="btn btn-secondary btn-large">Explore Features</a>
            </div>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">1.2k+</span>
                <span className="stat-label">Issues Resolved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active Citizens</span>
              </div>
            </div>
          </div>
          <div className="hero-image fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mockup-container glass-panel">
              <img src="/mockup.png" alt="StreetSense App Prototype" className="mockup-img" />
              <div className="floating-card report-card">
                <div className="icon-circle green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4>Pothole Fixed</h4>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features section-padding">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>Everything you need to improve your city</h2>
            <p>A complete toolkit for active citizens to report and track municipal issues.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass-panel fade-in-up">
              <div className="feature-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <h3>Easy Reporting</h3>
              <p>Snap a photo, select a category, and submit. Reporting a pothole, damaged sign, or broken streetlight takes less than 30 seconds.</p>
            </div>
            <div className="feature-card glass-panel fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
              </div>
              <h3>Interactive Maps</h3>
              <p>View all reported issues in your area on a dynamic map. See what's being worked on and avoid problem areas.</p>
            </div>
            <div className="feature-card glass-panel fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Community Impact</h3>
              <p>Earn points for reports and track your overall contribution. Watch your neighborhood transform through collective action.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works section-padding light-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>How StreetSense Works</h2>
          </div>
          <div className="steps-container">
            <div className="step fade-in-up">
              <div className="step-number">1</div>
              <h3>Spot an Issue</h3>
              <p>Notice a broken streetlight or a hazardous pothole during your daily commute.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="step-number">2</div>
              <h3>Report It</h3>
              <p>Open the app, drop a pin, and upload a quick photo with details.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="step-number">3</div>
              <h3>Track Progress</h3>
              <p>Get notified when the city addresses your report and marks it as resolved.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta section-padding">
        <div className="container">
          <div className="cta-card glass-panel text-center fade-in-up">
            <h2>Ready to transform your city?</h2>
            <p>Join the StreetSense early access prototype today and be among the first to test our community reporting platform.</p>
            <form className="cta-form" id="signup-form" onSubmit={handleFormSubmit}>
              <input type="email" placeholder="Enter your email address" required disabled={isSubmitting} />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Get Early Access'}
              </button>
            </form>
            {formMessage.text && (
              <p className="form-message" style={{ color: formMessage.color }}>{formMessage.text}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
