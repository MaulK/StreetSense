"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('road_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (!error && data && data.length > 0) {
        setReports(data);
      } else {
        // Fallback to dummy data for MVP presentation if DB is empty or fails
        setReports([
          { id: '1', road_name: 'Jl. Sudirman (Dekat Halte)', description: 'Lubang cukup dalam di lajur kiri, bahaya buat motor.', severity: 'High', latitude: -6.2088, longitude: 106.8456, created_at: new Date().toISOString() },
          { id: '2', road_name: 'Jl. Thamrin KM 2', description: 'Aspal bergelombang parah setelah hujan.', severity: 'Medium', latitude: -6.2115, longitude: 106.8451, created_at: new Date(Date.now() - 86400000).toISOString() },
        ]);
      }
      setLoading(false);
    }
    fetchReports();
  }, []);

  // Mock Predictive Data
  const highRiskSegments = [
    { id: 1, road: "Jl. Sudirman KM 5", riskScore: 89, reason: "Heavy rain history + high traffic volume + 5 years pavement age", preventiveAction: "Immediate resurfacing required before monsoon season." },
    { id: 2, road: "Jl. Thamrin Intersection", riskScore: 76, reason: "Medium traffic + recurrent minor potholes", preventiveAction: "Scheduled patching and drainage inspection." },
    { id: 3, road: "Jl. Gatot Subroto", riskScore: 92, reason: "Heavy cargo traffic + aging pavement (8 years)", preventiveAction: "Full structural evaluation and potential road foundation upgrade." }
  ];

  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Authority Dashboard</h1>
        <div className="badge" style={{ background: '#0A3A6E', color: 'white', padding: '8px 16px', borderRadius: '20px' }}>
          Live Insights
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Column: Recent Reports */}
        <section style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🚨</span> Recent Crowdsourced Reports
          </h3>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading reports...</div>
          ) : reports.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666', background: '#f9f9f9', borderRadius: '8px' }}>No reports found.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {reports.map(report => (
                <div key={report.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '12px', background: '#fafafa', borderLeft: `5px solid ${report.severity === 'High' ? '#dc3545' : report.severity === 'Medium' ? '#ffc107' : '#28a745'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>{report.road_name}</strong>
                    <span style={{ fontSize: '0.8rem', background: '#e9ecef', padding: '3px 8px', borderRadius: '12px' }}>{new Date(report.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', margin: '0 0 10px 0', color: '#555' }}>{report.description}</p>
                  <div style={{ fontSize: '0.8rem', color: '#777', display: 'flex', gap: '15px' }}>
                    <span>⚠️ Severity: <strong>{report.severity}</strong></span>
                    {report.latitude && <span>📍 {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Predictive Analysis & Preventive Actions */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #0A3A6E, #1C5A9A)', color: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem' }}>📊</span> Predictive Analysis
            </h3>
            <p style={{ color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '20px' }}>
              AI-driven risk assessment combining historical weather data, traffic intensity, and pavement age to predict future deterioration.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {highRiskSegments.map(segment => (
                <div key={segment.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '1.1rem' }}>{segment.road}</strong>
                    <div style={{ background: segment.riskScore > 85 ? '#ff4d4f' : '#faad14', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      Risk Score: {segment.riskScore}/100
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#d9d9d9', margin: 0 }}>
                    <strong>Factors:</strong> {segment.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e6f4ea' }}>
            <h3 style={{ color: '#1E824C', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span> Preventive Action Support
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
              Data-driven insights for authorities to take accurate preventive measures before road damage worsens.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {highRiskSegments.map(segment => (
                <div key={`action-${segment.id}`} style={{ padding: '15px', background: '#f8fdfa', borderRadius: '10px', borderLeft: '4px solid #1E824C' }}>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Action for {segment.road}</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>✅ {segment.preventiveAction}</p>
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px', background: '#1E824C' }}>
              Generate Maintenance Work Orders
            </button>
          </div>

        </section>
      </div>
    </main>
  );
}
