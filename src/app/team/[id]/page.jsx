export default async function TeamMemberPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Fetch data for a specific user
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    return (
      <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
        <h1>Member Not Found</h1>
      </main>
    );
  }

  const member = await res.json();

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{member.name}</h1>
        <p style={{ fontSize: '1.2rem', color: '#0066cc', marginBottom: '30px' }}>{member.company.name}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div>
            <h3 style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Contact Info</h3>
            <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {member.email}</p>
            <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> {member.phone}</p>
            <p style={{ marginBottom: '8px' }}><strong>Website:</strong> {member.website}</p>
          </div>
          <div>
            <h3 style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Location</h3>
            <p style={{ marginBottom: '8px' }}>{member.address.suite} {member.address.street}</p>
            <p style={{ marginBottom: '8px' }}>{member.address.city}, {member.address.zipcode}</p>
          </div>
        </div>
        
        <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '10px' }}>About Company</h3>
          <p style={{ fontStyle: 'italic', color: '#555' }}>"{member.company.catchPhrase}"</p>
          <p style={{ marginTop: '10px', color: '#666' }}>{member.company.bs}</p>
        </div>
      </div>
    </main>
  );
}
