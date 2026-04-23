export const metadata = {
  title: 'Our Services | StreetSense',
  description: 'Discover the suite of tools and services provided by StreetSense.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Community Reporting',
      desc: 'Easily report local issues with photos and geolocation to ensure quick response from authorities. The platform automatically tags the relevant departments.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Real-time Tracking',
      desc: 'Stay updated on the status of your reports and see when issues are resolved in real-time. Receive notifications when action is taken on your submissions.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'Data Analytics',
      desc: 'Access neighborhood data insights to understand trends and improvements in your community. View interactive heatmaps of reported and resolved issues.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Direct Feedback Loops',
      desc: 'Local governments can reply directly to citizens, request more info, and provide context on why certain issues might take longer to fix.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'Community Polling',
      desc: 'Propose new neighborhood initiatives and let residents vote on what matters most, guiding budget allocation and priority.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'API Integration',
      desc: 'Connect StreetSense data directly to existing city management software (like 311 systems) via our secure, robust API.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      color: 'green'
    }
  ];

  return (
    <main>
      <section className="hero" style={{ padding: '12rem 0 6rem', textAlign: 'center' }}>
        <div className="hero-bg-shapes">
          <div className="shape shape-2" style={{ top: '-10%', right: '-10%', left: 'auto', bottom: 'auto' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge">What We Offer</span>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Our <span className="highlight">Services</span></h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            Comprehensive tools designed to bridge the gap between citizens and local authorities, 
            making neighborhood management seamless and transparent.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '0' }}>
            {services.map((service, idx) => (
              <div key={idx} className="feature-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={`feature-icon ${service.color}`}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', flexGrow: 1 }}>
                  {service.desc}
                </p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ color: 'var(--primary-blue)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding light-bg">
        <div className="container text-center">
          <div className="cta-card glass-panel" style={{ background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))', borderRadius: '24px' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to transform your community?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Join hundreds of neighborhoods already using StreetSense to make a visible difference.
            </p>
            <a href="/contact" className="btn" style={{ background: 'var(--accent-green)', color: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px' }}>
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
