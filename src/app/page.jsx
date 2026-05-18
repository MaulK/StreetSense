"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
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
      setFormMessage({ text: t("Thanks for joining! We'll be in touch soon.", "Terima kasih telah bergabung! Kami akan segera menghubungi Anda."), color: "var(--accent-green)" });
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
            <div className="badge">{t('Early Access Prototype', 'Prototipe Akses Awal')}</div>
            <h1>{t('Make your neighborhood', 'Buat lingkungan Anda')} <span className="highlight">{t('safer, together.', 'lebih aman, bersama.')}</span></h1>
            <p>{t("StreetSense empowers you to report local issues, track their progress, and see the real impact you're making in your community.", "StreetSense memberdayakan Anda untuk melaporkan masalah lokal, melacak kemajuan mereka, dan melihat dampak nyata yang Anda buat di komunitas Anda.")}</p>
            <div className="hero-actions">
              <a href="/#cta" className="btn btn-primary btn-large">Get Started</a>
              <a href="/#features" className="btn btn-secondary btn-large">Explore Features</a>
            </div>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">1.2k+</span>
                <span className="stat-label">{t('Issues Resolved', 'Masalah Selesai')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">{t('Active Citizens', 'Warga Aktif')}</span>
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
                  <h4>{t('Pothole Fixed', 'Jalan Berlubang Diperbaiki')}</h4>
                  <span>{t('2 hours ago', '2 jam yang lalu')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features section-padding">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>{t('Everything you need to improve your city', 'Semua yang Anda butuhkan untuk meningkatkan kota Anda')}</h2>
            <p>{t('A complete toolkit for active citizens to report and track municipal issues.', 'Alat lengkap bagi warga aktif untuk melaporkan dan melacak masalah kota.')}</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass-panel fade-in-up">
              <div className="feature-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <h3>{t('Easy Reporting', 'Pelaporan Mudah')}</h3>
              <p>{t('Snap a photo, select a category, and submit. Reporting a pothole, damaged sign, or broken streetlight takes less than 30 seconds.', 'Ambil foto, pilih kategori, dan kirim. Melaporkan jalan berlubang, rambu rusak, atau lampu jalan mati membutuhkan waktu kurang dari 30 detik.')}</p>
            </div>
            <div className="feature-card glass-panel fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
              </div>
              <h3>{t('Interactive Maps', 'Peta Interaktif')}</h3>
              <p>{t("View all reported issues in your area on a dynamic map. See what's being worked on and avoid problem areas.", "Lihat semua masalah yang dilaporkan di area Anda pada peta dinamis. Lihat apa yang sedang dikerjakan dan hindari area bermasalah.")}</p>
            </div>
            <div className="feature-card glass-panel fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>{t('Community Impact', 'Dampak Komunitas')}</h3>
              <p>{t('Earn points for reports and track your overall contribution. Watch your neighborhood transform through collective action.', 'Dapatkan poin untuk laporan dan lacak kontribusi Anda secara keseluruhan. Saksikan transformasi lingkungan Anda melalui tindakan kolektif.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works section-padding light-bg">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <h2>{t('How StreetSense Works', 'Cara Kerja StreetSense')}</h2>
          </div>
          <div className="steps-container">
            <div className="step fade-in-up">
              <div className="step-number">1</div>
              <h3>{t('Spot an Issue', 'Temukan Masalah')}</h3>
              <p>{t('Notice a broken streetlight or a hazardous pothole during your daily commute.', 'Perhatikan lampu jalan yang mati atau lubang berbahaya selama perjalanan harian Anda.')}</p>
            </div>
            <div className="step-connector"></div>
            <div className="step fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="step-number">2</div>
              <h3>{t('Report It', 'Laporkan')}</h3>
              <p>{t('Open the app, drop a pin, and upload a quick photo with details.', 'Buka aplikasi, jatuhkan pin, dan unggah foto singkat beserta detailnya.')}</p>
            </div>
            <div className="step-connector"></div>
            <div className="step fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="step-number">3</div>
              <h3>{t('Track Progress', 'Lacak Kemajuan')}</h3>
              <p>{t('Get notified when the city addresses your report and marks it as resolved.', 'Dapatkan pemberitahuan saat kota menindaklanjuti laporan Anda dan menandainya sebagai selesai.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta section-padding">
        <div className="container">
          <div className="cta-card glass-panel text-center fade-in-up">
            <h2>{t('Ready to transform your city?', 'Siap untuk mengubah kota Anda?')}</h2>
            <p>{t('Join the StreetSense early access prototype today and be among the first to test our community reporting platform.', 'Bergabunglah dengan prototipe akses awal StreetSense hari ini dan jadilah yang pertama menguji platform pelaporan komunitas kami.')}</p>
            <form className="cta-form" id="signup-form" onSubmit={handleFormSubmit}>
              <input type="email" placeholder={t('Enter your email address', 'Masukkan alamat email Anda')} required disabled={isSubmitting} />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? t('Sending...', 'Mengirim...') : t('Get Early Access', 'Dapatkan Akses Awal')}
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
