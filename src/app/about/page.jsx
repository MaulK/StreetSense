export const metadata = {
  title: 'About Us | StreetSense',
  description: 'Learn about the mission behind StreetSense.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero" style={{ padding: '12rem 0 8rem', textAlign: 'center' }}>
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge">Our Story</span>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>About <span className="highlight">StreetSense</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            We believe that everyone deserves to live in a safe, well-maintained neighborhood. 
            Our mission is to empower citizens with the tools they need to communicate effectively 
            with their local governments and drive meaningful change in their communities.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass-panel" style={{ textAlign: 'center' }}>
              <div className="feature-icon green" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Transparency</h3>
              <p>We believe in open communication between citizens and local authorities to build trust.</p>
            </div>
            <div className="feature-card glass-panel" style={{ textAlign: 'center' }}>
              <div className="feature-icon blue" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Community</h3>
              <p>Strong neighborhoods are built when people come together to solve common problems.</p>
            </div>
            <div className="feature-card glass-panel" style={{ textAlign: 'center' }}>
              <div className="feature-icon green" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Action</h3>
              <p>We focus on delivering measurable results that improve the quality of daily life.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
