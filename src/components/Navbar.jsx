"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsActive(!isActive);

  return (
    <header className="navbar" style={{
      boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none',
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'
    }}>
      <div className="container nav-content">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          StreetSense
        </Link>
        <nav className={`nav-links ${isActive ? 'active' : ''}`}>
          <Link href="/#features" onClick={() => setIsActive(false)}>Features</Link>
          <Link href="/about" onClick={() => setIsActive(false)}>About</Link>
          <Link href="/services" onClick={() => setIsActive(false)}>Services</Link>
          <Link href="/impact" onClick={() => setIsActive(false)}>Impact</Link>
          <Link href="/team" onClick={() => setIsActive(false)}>Team</Link>
          <Link href="/contact" onClick={() => setIsActive(false)}>Contact</Link>
        </nav>
        <Link href="/#cta" className="btn btn-primary" style={{ display: 'inline-block' }}>Join Prototype</Link>
        <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={toggleMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
