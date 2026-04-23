export const metadata = {
  title: 'Careers | StreetSense',
  description: 'Join the StreetSense team and help us build better communities.',
};

export default function CareersPage() {
  const jobs = [
    { title: 'Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'Community Manager', department: 'Operations', location: 'New York, NY', type: 'Full-time' },
    { title: 'Product Designer', department: 'Design', location: 'Remote', type: 'Contract' }
  ];

  return (
    <main>
      <section className="hero" style={{ padding: '12rem 0 6rem', textAlign: 'center' }}>
        <div className="hero-bg-shapes">
          <div className="shape shape-1" style={{ top: '10%', right: '10%' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge">Join Us</span>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Careers at <span className="highlight">StreetSense</span></h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
            We're always looking for passionate individuals who want to make a real difference in local communities through technology.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <h2>Open Positions</h2>
            <p>Find where you fit in.</p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {jobs.map((job, idx) => (
              <div key={idx} className="glass-panel feature-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span><strong style={{ color: 'var(--text-dark)' }}>Dept:</strong> {job.department}</span>
                    <span><strong style={{ color: 'var(--text-dark)' }}>Location:</strong> {job.location}</span>
                    <span><strong style={{ color: 'var(--text-dark)' }}>Type:</strong> {job.type}</span>
                  </div>
                </div>
                <div>
                  <span className="btn btn-secondary">Apply Now</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3rem', background: 'var(--bg-light)', borderRadius: '16px' }}>
            <h3>Don't see a fit?</h3>
            <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>We'd still love to hear from you. Send us your resume and tell us how you can help.</p>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </main>
  );
}
