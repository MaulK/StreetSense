import Link from 'next/link';

export default async function TeamPage() {
  // Fetch data from a public API
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    return <main className="container" style={{ padding: '120px 20px' }}><h1>Failed to load team data</h1></main>;
  }
  
  const teamMembers = await res.json();

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <h1>Meet Our Team</h1>
      <p style={{ marginTop: '10px', color: '#666' }}>The dedicated people behind StreetSense.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
        {teamMembers.map((member) => (
          <Link href={`/team/${member.id}`} key={member.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ padding: '24px', borderRadius: '12px', background: '#fff', border: '1px solid #eaeaea', transition: 'transform 0.2s, boxShadow 0.2s', cursor: 'pointer' }} className="team-card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{member.name}</h2>
              <p style={{ color: '#0066cc', fontWeight: '500', marginBottom: '12px' }}>{member.company.name}</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{member.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
