"use client";
import { useActionState, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { submitRoadReport } from '../actions/report';

const ReportMap = dynamic(() => import('../../components/ReportMap'), { ssr: false });

export default function ReportPage() {
  const [state, formAction, isPending] = useActionState(submitRoadReport, null);
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
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
        setLocationError('Unable to retrieve your location. Please check your permissions.');
      }
    );
  };

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <h1>Lapor Jalan Rusak</h1>
      <p style={{ marginTop: '10px', marginBottom: '30px', color: '#666' }}>
        Bantu komunitas dengan melaporkan titik jalan rusak atau berlubang. Informasi Anda dapat mencegah kecelakaan!
      </p>
      
      {state?.success ? (
        <div style={{ padding: '20px', background: '#e6f4ea', color: '#137333', borderRadius: '8px', maxWidth: '600px' }}>
          <h3>🎉 Berhasil!</h3>
          <p>{state.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary" 
            style={{ marginTop: '15px', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >
            Lapor Lagi
          </button>
        </div>
      ) : (
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {state?.error && (
            <div style={{ padding: '15px', background: '#fce8e6', color: '#c5221f', borderRadius: '6px' }}>
              {state.error}
            </div>
          )}
          
          <div>
            <label htmlFor="road_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nama Jalan / Lokasi *</label>
            <input type="text" id="road_name" name="road_name" placeholder="Contoh: Jl. Sudirman (Dekat Halte)" required disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          </div>

          <div>
            <label htmlFor="severity" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Tingkat Keparahan *</label>
            <select id="severity" name="severity" required disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', backgroundColor: '#fff' }}>
              <option value="">-- Pilih Tingkat Keparahan --</option>
              <option value="Low">Ringan (Beresiko rendah, jalan bergelombang)</option>
              <option value="Medium">Sedang (Lubang kecil, membahayakan motor)</option>
              <option value="High">Tinggi (Lubang besar/dalam, membahayakan semua kendaraan)</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Deskripsi Kerusakan *</label>
            <textarea id="description" name="description" placeholder="Jelaskan detail kerusakan..." required rows="4" disabled={isPending} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}></textarea>
          </div>

          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Deteksi Lokasi GPS</label>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>Bagikan titik koordinat Anda agar pengguna lain dapat melihat lokasi persisnya.</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
              <button type="button" onClick={getLocation} disabled={isPending} style={{ padding: '10px 15px', background: '#e9ecef', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                📍 Dapatkan Lokasi Saya
              </button>
              {location.lat && <span style={{ fontSize: '0.9rem', color: '#28a745', fontWeight: '500' }}>Lokasi berhasil didapatkan ✓</span>}
            </div>
            {locationError && <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '10px' }}>{locationError}</p>}
            
            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>Atau klik pada peta untuk menentukan lokasi dengan lebih presisi:</p>
            <ReportMap location={location} setLocation={setLocation} />
            
            <input type="hidden" name="latitude" value={location.lat} />
            <input type="hidden" name="longitude" value={location.lng} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isPending} style={{ padding: '14px', marginTop: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: isPending ? 'not-allowed' : 'pointer', border: 'none', borderRadius: '8px', background: isPending ? '#999' : '#0056b3', color: '#fff', transition: 'background 0.3s' }}>
            {isPending ? 'Mengirim Laporan...' : 'Kirim Laporan Jalan Rusak'}
          </button>
        </form>
      )}
    </main>
  );
}
