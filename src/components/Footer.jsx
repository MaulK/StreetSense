"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              StreetSense
            </Link>
            <p>{t('Empowering communities through technology.', 'Memberdayakan komunitas melalui teknologi.')}</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>{t('Product', 'Produk')}</h4>
              <Link href="/#features">{t('Features', 'Fitur')}</Link>
              <Link href="/#how-it-works">{t('How it works', 'Cara Kerja')}</Link>
            </div>
            <div className="link-group">
              <h4>{t('Company', 'Perusahaan')}</h4>
              <Link href="/about">{t('About Us', 'Tentang Kami')}</Link>
              <Link href="/careers">{t('Careers', 'Karir')}</Link>
              <Link href="/contact">{t('Contact', 'Kontak')}</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 StreetSense. {t('All rights reserved. Prototype Demo.', 'Hak cipta dilindungi undang-undang. Demo Prototipe.')}</p>
        </div>
      </div>
    </footer>
  );
}
