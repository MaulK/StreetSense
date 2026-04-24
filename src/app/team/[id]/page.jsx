import Link from 'next/link';
import { teamData } from '../page';

const avatars = {
  male: 'https://img.icons8.com/ios-filled/200/0A3A6E/user-male.png',
  female: 'https://img.icons8.com/ios-filled/200/0A3A6E/user-female.png'
};

export default async function TeamMemberPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const member = teamData.find(m => m.id === parseInt(id));
  
  if (!member) {
    return (
      <main className="container section-padding" style={{ minHeight: '80vh' }}>
        <h1>Member Not Found</h1>
        <Link href="/team" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Team</Link>
      </main>
    );
  }

  const avatarUrl = avatars[member.gender];

  return (
    <main className="container section-padding" style={{ minHeight: '80vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/team" style={{ color: 'var(--primary-blue)', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Back to Team
        </Link>
      </div>

      <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(10,58,110,0.05) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }}></div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div className="team-avatar" style={{ width: '180px', height: '180px', flexShrink: 0, padding: '30px', background: 'rgba(10, 58, 110, 0.05)' }}>
            <img src={avatarUrl} alt={member.name} style={{ objectFit: 'contain' }} />
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{member.name}</h1>
            <div className="team-role" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{member.role}</div>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', fontStyle: 'italic', maxWidth: '600px' }}>
              "{member.catchPhrase}"
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
