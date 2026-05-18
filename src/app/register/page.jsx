"use client";
import { useActionState } from 'react';
import Link from 'next/link';
import { registerUser } from '../actions/auth';
import { useLanguage } from '../../context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>{t('Create Account', 'Buat Akun')}</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>{t('Join the authority network today', 'Bergabunglah dengan jaringan otoritas hari ini')}</p>

        {state?.success && state.message ? (
          <div style={{ padding: '20px', background: '#e6f4ea', color: '#137333', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>🎉 {t('Success!', 'Sukses!')}</p>
            <p>{state.message}</p>
            <Link href="/login" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '15px' }}>
              {t('Go to Login', 'Pergi ke Masuk')}
            </Link>
          </div>
        ) : (
          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {state?.error && (
              <div style={{ padding: '12px', background: '#fce8e6', color: '#c5221f', borderRadius: '8px', fontSize: '0.9rem' }}>
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('Email Address', 'Alamat Email')}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                disabled={isPending}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} 
                placeholder="authority@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('Password', 'Kata Sandi')}</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                disabled={isPending}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} 
                placeholder="••••••••"
              />
              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>{t('Must be at least 6 characters long.', 'Harus setidaknya 6 karakter.')}</p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isPending}
              style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '1rem', border: 'none', opacity: isPending ? 0.7 : 1 }}
            >
              {isPending ? t('Registering...', 'Mendaftar...') : t('Create Account', 'Buat Akun')}
            </button>
          </form>
        )}

        {!state?.success && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            {t('Already have an account?', 'Sudah punya akun?')} <Link href="/login" style={{ color: '#0A3A6E', fontWeight: '600' }}>{t('Sign in here', 'Masuk di sini')}</Link>
          </p>
        )}
      </div>
    </main>
  );
}
