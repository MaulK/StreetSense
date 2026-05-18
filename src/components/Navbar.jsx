"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { logoutUser } from '../app/actions/auth';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ isLoggedIn }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

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
          <Link href="/#features" onClick={() => setIsActive(false)}>{t('Features', 'Fitur')}</Link>
          <Link href="/dashboard" onClick={() => setIsActive(false)}>{t('Dashboard', 'Dasbor')}</Link>
          
          <div 
            className="dropdown"
            onMouseEnter={() => setIsDropdownActive(true)}
            onMouseLeave={() => setIsDropdownActive(false)}
            onClick={() => setIsDropdownActive(!isDropdownActive)}
          >
            <button className="dropbtn" aria-expanded={isDropdownActive}>
              {t('Company', 'Perusahaan')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '4px', transform: isDropdownActive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease'}}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className={`dropdown-content ${isDropdownActive ? 'show' : ''}`}>
              <Link href="/about" onClick={() => setIsActive(false)}>{t('About', 'Tentang')}</Link>
              <Link href="/services" onClick={() => setIsActive(false)}>{t('Services', 'Layanan')}</Link>
              <Link href="/impact" onClick={() => setIsActive(false)}>{t('Impact', 'Dampak')}</Link>
              <Link href="/team" onClick={() => setIsActive(false)}>{t('Team', 'Tim')}</Link>
              <Link href="/contact" onClick={() => setIsActive(false)}>{t('Contact', 'Kontak')}</Link>
            </div>
          </div>

        </nav>
        <div className="nav-actions">
          <button onClick={toggleLanguage} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', minWidth: '40px' }} title={t('Change Language', 'Ganti Bahasa')}>
            {lang === 'en' ? 'ID' : 'EN'}
          </button>
          {isLoggedIn ? (
            <form action={logoutUser} className="auth-form">
              <button type="submit" className="btn btn-secondary">{t('Logout', 'Keluar')}</button>
            </form>
          ) : (
            <Link href="/login" className="btn btn-secondary">{t('Login', 'Masuk')}</Link>
          )}
          <Link href="/report" className="btn btn-primary">{t('Lapor', 'Lapor')}</Link>
        </div>
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
