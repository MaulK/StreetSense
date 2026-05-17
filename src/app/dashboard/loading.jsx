export default function Loading() {
  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ width: '300px', height: '40px', background: '#e0e0e0', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
        <div style={{ width: '150px', height: '35px', background: '#e0e0e0', borderRadius: '20px', animation: 'pulse 1.5s infinite' }}></div>
      </div>
      
      <div className="dashboard-grid">
        <section style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '250px', height: '30px', background: '#e0e0e0', borderRadius: '8px', marginBottom: '20px', animation: 'pulse 1.5s infinite' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: '100px', background: '#e0e0e0', borderRadius: '12px', animation: 'pulse 1.5s infinite' }}></div>
            ))}
          </div>
        </section>
        
        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ height: '250px', background: '#e0e0e0', borderRadius: '16px', animation: 'pulse 1.5s infinite' }}></div>
          <div style={{ height: '250px', background: '#e0e0e0', borderRadius: '16px', animation: 'pulse 1.5s infinite' }}></div>
        </section>
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}
