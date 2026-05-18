"use client";
import { useActionState } from 'react';
import Link from 'next/link';
import { loginUser } from '../actions/auth';
import { useLanguage } from '../../context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>{t('Welcome Back', 'Selamat Datang Kembali')}</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>{t('Log in to access the Authority Dashboard', 'Masuk untuk mengakses Dasbor Otoritas')}</p>

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
              placeholder="admin@example.com"
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
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isPending}
            style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '1rem', border: 'none', opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? t('Authenticating...', 'Mengautentikasi...') : t('Sign In', 'Masuk')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
          {t("Don't have an account?", 'Belum punya akun?')} <Link href="/register" style={{ color: '#0056b3', fontWeight: '600' }}>{t('Register here', 'Daftar di sini')}</Link>
        </p>
      </div>
    </main>
  );
}
