"use client";
import { useActionState, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { submitRoadReport } from '../actions/report';
import { useLanguage } from '../../context/LanguageContext';

const ReportMap = dynamic(() => import('../../components/ReportMap'), { ssr: false });

export default function ReportPage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(submitRoadReport, null);
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [locationError, setLocationError] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getLocation();
    
    // Animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t('Geolocation is not supported by your browser', 'Geolokasi tidak didukung oleh browser Anda'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError('');
      },
      () => {
        setLocationError(t('Unable to retrieve your location. Please check your permissions.', 'Tidak dapat mengambil lokasi Anda. Harap periksa izin Anda.'));
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setFilePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setFilePreview(URL.createObjectURL(file));
        // Note: setting it to the input programmatically is tricky, 
        // but we'll focus on the preview for the MVP visual.
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
        }
      }
    }
  };

  return (
    <main className="report-main" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)' }}>
      <div className="container">
        <div className="report-header fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(90deg, var(--primary-blue), var(--accent-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>
            {t('Report an Issue', 'Lapor Masalah')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            {t('Your voice matters. Upload evidence, pin the location, and help us build a safer community.', 'Suara Anda penting. Unggah bukti, sematkan lokasi, dan bantu kami membangun komunitas yang lebih aman.')}
          </p>
        </div>

        {state?.success ? (
          <div className="success-card glass-panel" style={{ animation: 'fadeInUpDirect 0.8s forwards', maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '40px', borderRadius: '24px', border: '2px solid rgba(30, 130, 76, 0.3)' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(30, 130, 76, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--accent-green)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style={{ color: 'var(--accent-green)', marginBottom: '10px' }}>{t('Report Submitted!', 'Laporan Terkirim!')}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{state.message}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary btn-large" style={{ borderRadius: '50px', padding: '12px 30px' }}>
              {t('Submit Another Report', 'Kirim Laporan Lain')}
            </button>
          </div>
        ) : (
          <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', alignItems: 'flex-start' }}>
            
            {/* Map & Location Section */}
            <div className="map-section glass-panel fade-in-up" style={{ padding: '25px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px', animationDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary-blue)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{t('1. Pin Location', '1. Sematkan Lokasi')}</h3>
              </div>
              
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '350px', background: '#e9ecef' }}>
                <ReportMap location={location} setLocation={setLocation} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={getLocation} disabled={isPending} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', borderRadius: '50px', fontSize: '0.9rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                  {t('Use GPS', 'Gunakan GPS')}
                </button>
                {location.lat && <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {t('Location Locked', 'Lokasi Terkunci')}
                </span>}
              </div>
              {locationError && <p style={{ color: '#dc3545', fontSize: '0.85rem', margin: 0 }}>{locationError}</p>}
            </div>

            {/* Form Section */}
            <form action={formAction} className="form-section glass-panel fade-in-up" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '25px', animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--accent-green)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{t('2. Details & Evidence', '2. Detail & Bukti')}</h3>
              </div>

              {state?.error && (
                <div style={{ padding: '15px', background: '#fce8e6', color: '#c5221f', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {state.error}
                </div>
              )}

              <div className="input-group">
                <label htmlFor="reporter_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Your Name (Optional)', 'Nama Anda (Opsional)')}</label>
                <input type="text" id="reporter_name" name="reporter_name" placeholder={t('e.g., John Doe', 'Contoh: Budi Santoso')} disabled={isPending} 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', transition: 'border-color 0.3s, box-shadow 0.3s' }} 
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(10, 58, 110, 0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div className="input-group">
                <label htmlFor="road_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Road Name / Landmark *', 'Nama Jalan / Patokan *')}</label>
                <input type="text" id="road_name" name="road_name" placeholder={t('e.g., Jl. Sudirman (Near Bus Stop)', 'Contoh: Jl. Sudirman (Dekat Halte)')} required disabled={isPending} 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', transition: 'border-color 0.3s, box-shadow 0.3s' }} 
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(10, 58, 110, 0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div className="input-group">
                <label htmlFor="severity" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Severity Level *', 'Tingkat Keparahan *')}</label>
                <div style={{ position: 'relative' }}>
                  <select id="severity" name="severity" required disabled={isPending} 
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', appearance: 'none', cursor: 'pointer', transition: 'border-color 0.3s' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary-blue)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                  >
                    <option value="">{t('-- Select Severity Level --', '-- Pilih Tingkat Keparahan --')}</option>
                    <option value="Low">{t('Low (Minor bumps, cracks)', 'Ringan (Retak, bergelombang)')}</option>
                    <option value="Medium">{t('Medium (Small pothole, hazardous to bikes)', 'Sedang (Lubang kecil, bahaya bagi motor)')}</option>
                    <option value="High">{t('High (Deep pothole, immediate danger)', 'Tinggi (Lubang dalam, sangat berbahaya)')}</option>
                  </select>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Description *', 'Deskripsi Kerusakan *')}</label>
                <textarea id="description" name="description" placeholder={t('Provide details about the issue...', 'Berikan detail tentang masalah tersebut...')} required rows="3" disabled={isPending} 
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', resize: 'vertical', transition: 'border-color 0.3s' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary-blue)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                ></textarea>
              </div>

              {/* Modern Drag & Drop File Upload */}
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Evidence (Photo/Video)', 'Bukti (Foto/Video)')}</label>
                <div 
                  className={`upload-zone ${dragActive ? 'active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragActive ? 'var(--primary-blue)' : 'rgba(0,0,0,0.15)'}`,
                    borderRadius: '16px',
                    padding: '30px',
                    textAlign: 'center',
                    background: dragActive ? 'rgba(10, 58, 110, 0.05)' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    name="evidence" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    disabled={isPending}
                    style={{ display: 'none' }} 
                  />
                  
                  {filePreview ? (
                    <div className="preview-container" style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={filePreview} alt="Evidence Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{t('Click to change', 'Klik untuk mengubah')}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ pointerEvents: 'none' }}>
                      <div style={{ width: '50px', height: '50px', background: 'rgba(10, 58, 110, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'var(--primary-blue)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      </div>
                      <p style={{ margin: '0 0 5px', fontWeight: '600', color: 'var(--text-dark)' }}>{t('Click to upload or drag & drop', 'Klik untuk mengunggah atau seret & lepas')}</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>SVG, PNG, JPG or MP4 (max. 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <input type="hidden" name="latitude" value={location.lat} />
              <input type="hidden" name="longitude" value={location.lng} />

              <button type="submit" className="btn btn-primary" disabled={isPending} 
                style={{ 
                  padding: '16px', 
                  marginTop: '10px', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold', 
                  cursor: isPending ? 'not-allowed' : 'pointer', 
                  border: 'none', 
                  borderRadius: '50px', 
                  background: isPending ? '#94a3b8' : 'linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))', 
                  color: '#fff', 
                  transition: 'all 0.3s ease',
                  boxShadow: isPending ? 'none' : '0 10px 15px -3px rgba(10, 58, 110, 0.3)',
                  transform: isPending ? 'none' : 'translateY(0)'
                }}
                onMouseEnter={(e) => { if(!isPending) e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { if(!isPending) e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {isPending ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                    {t('Submitting...', 'Mengirim...')}
                  </span>
                ) : t('Submit Report', 'Kirim Laporan')}
              </button>
            </form>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeInUpDirect { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .upload-zone:hover { border-color: var(--primary-blue) !important; background: rgba(10, 58, 110, 0.02) !important; }
      `}} />
    </main>
  );
}
