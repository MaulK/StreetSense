import Link from 'next/link';

export const teamData = [
  {
    id: 1,
    name: 'Kevin Ezra Duduong',
    role: 'Founder',
    gender: 'male',
    catchPhrase: 'Visionary leader driving the mission of StreetSense.',
  },
  {
    id: 2,
    name: 'Farhan Arva Amanta',
    role: 'Marketing Director',
    gender: 'male',
    catchPhrase: 'Creative strategist shaping the voice of our brand.',
  },
  {
    id: 3,
    name: 'Maulana Khoirusyifa',
    role: 'Full Stack Dev',
    gender: 'male',
    catchPhrase: 'Technical wizard building the core of our platform.',
  },
  {
    id: 4,
    name: 'Klementina Ytu',
    role: 'UI/UX Designer',
    gender: 'female',
    catchPhrase: 'Design expert ensuring a seamless user experience.',
  }
];

const avatars = {
  male: 'https://img.icons8.com/ios-filled/200/0A3A6E/user-male.png',
  female: 'https://img.icons8.com/ios-filled/200/0A3A6E/user-female.png'
};

export default function TeamPage() {
  return (
    <main className="container section-padding" style={{ minHeight: '80vh' }}>
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <div className="badge">Our People</div>
        <h2>Meet Our Team</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          The passionate individuals driving innovation and excellence at StreetSense.
        </p>
      </div>
      
      <div className="team-grid">
        {teamData.map((member) => {
          const avatarUrl = avatars[member.gender];
          
          return (
            <Link href={`/team/${member.id}`} key={member.id}>
              <div className="team-card">
                <div className="team-avatar" style={{ padding: '20px', background: 'rgba(10, 58, 110, 0.05)' }}>
                  <img src={avatarUrl} alt={member.name} style={{ objectFit: 'contain' }} />
                </div>
                <h3>{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p style={{ fontSize: '0.95rem' }}>{member.catchPhrase}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
