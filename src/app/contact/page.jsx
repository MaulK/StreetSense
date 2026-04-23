"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <h1>Contact Us</h1>
      <p style={{ marginTop: '10px', marginBottom: '30px', color: '#666' }}>Have questions or feedback? We'd love to hear from you.</p>
      
      {status ? (
        <div style={{ padding: '20px', background: '#e6f4ea', color: '#137333', borderRadius: '8px', maxWidth: '500px' }}>
          {status}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name</label>
            <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
            <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Message</label>
            <textarea required rows="5" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '10px', fontSize: '1rem', cursor: 'pointer', border: 'none', borderRadius: '6px' }}>
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
