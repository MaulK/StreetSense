"use client";
import { useActionState } from 'react';
import { submitContactForm } from '../actions/contact';

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <h1>Contact Us</h1>
      <p style={{ marginTop: '10px', marginBottom: '30px', color: '#666' }}>Have questions or feedback? We'd love to hear from you.</p>
      
      {state?.success ? (
        <div style={{ padding: '20px', background: '#e6f4ea', color: '#137333', borderRadius: '8px', maxWidth: '500px' }}>
          {state.message}
        </div>
      ) : (
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
          {state?.error && (
            <div style={{ padding: '10px', background: '#fce8e6', color: '#c5221f', borderRadius: '6px' }}>
              {state.error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Name</label>
            <input type="text" id="name" name="name" required disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', opacity: isPending ? 0.7 : 1 }} />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
            <input type="email" id="email" name="email" required disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', opacity: isPending ? 0.7 : 1 }} />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Message</label>
            <textarea id="message" name="message" required rows="5" disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', opacity: isPending ? 0.7 : 1 }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isPending} style={{ padding: '12px', marginTop: '10px', fontSize: '1rem', cursor: isPending ? 'not-allowed' : 'pointer', border: 'none', borderRadius: '6px', background: isPending ? '#999' : undefined }}>
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </main>
  );
}
