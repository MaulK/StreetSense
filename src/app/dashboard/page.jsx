"use client";
import { useState, useEffect, useOptimistic, useTransition, Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

function DashboardContent() {
  const [reports, setReports] = useState([]);
  const [solvedReports, setSolvedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchFilter = searchParams.get('search')?.toString() || '';
  const severityFilter = searchParams.get('severity')?.toString() || '';

  // Optimistic UI Hook setup
  const [optimisticReports, addOptimisticReport] = useOptimistic(
    reports,
    (state, idToRemove) => state.filter((report) => report.id !== idToRemove)
  );

  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSeverityChange = (e) => {
    const severity = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (severity) {
      params.set('severity', severity);
    } else {
      params.delete('severity');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleResolve = async (report) => {
    // Instant UI Update
    startTransition(() => {
      addOptimisticReport(report.id);
    });
    
    // Add to solved log
    setSolvedReports(prev => [{...report, status: 'Resolved', solved_at: new Date().toISOString()}, ...prev]);

    // Simulate server action
    try {
      await supabase.from('road_reports').update({ status: 'Resolved' }).eq('id', report.id);
      setReports((prev) => prev.filter(r => r.id !== report.id));
    } catch (err) {
      console.error("Failed to update report:", err);
    }
  };

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      
      let query = supabase
        .from('road_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (severityFilter) {
        query = query.eq('severity', severityFilter);
      }
      if (searchFilter) {
        query = query.ilike('road_name', `%${searchFilter}%`);
      }
      
      const { data, error } = await query.limit(50);
      
      if (!error && data && data.length > 0) {
        setReports(data.filter(r => r.status !== 'Resolved'));
        setSolvedReports(data.filter(r => r.status === 'Resolved'));
      } else {
        // Fallback or empty logic
        if (!error && data && data.length === 0) {
          setReports([]);
        } else {
          // Dummy data for MVP presentation
          let dummyData = [
            { id: '1', road_name: 'Jl. Sudirman (Dekat Halte)', description: 'Lubang cukup dalam di lajur kiri, bahaya buat motor.', severity: 'High', latitude: -6.2088, longitude: 106.8456, created_at: new Date().toISOString(), reporter_name: 'Budi Santoso', evidence_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
            { id: '2', road_name: 'Jl. Thamrin KM 2', description: 'Aspal bergelombang parah setelah hujan.', severity: 'Medium', latitude: -6.2115, longitude: 106.8451, created_at: new Date(Date.now() - 86400000).toISOString(), reporter_name: 'Siti Aminah' },
          ];
          
          if (severityFilter) {
            dummyData = dummyData.filter(d => d.severity === severityFilter);
          }
          if (searchFilter) {
            dummyData = dummyData.filter(d => d.road_name.toLowerCase().includes(searchFilter.toLowerCase()));
          }
          
          setReports(dummyData);
        }
      }
      setLoading(false);
    }
    fetchReports();
  }, [searchFilter, severityFilter]);

  // Mock Predictive Data
  const highRiskSegments = [
    { id: 1, road: "Jl. Sudirman KM 5", riskScore: 89, reason: "Heavy rain history + high traffic volume + 5 years pavement age", preventiveAction: "Immediate resurfacing required before monsoon season." },
    { id: 2, road: "Jl. Thamrin Intersection", riskScore: 76, reason: "Medium traffic + recurrent minor potholes", preventiveAction: "Scheduled patching and drainage inspection." },
    { id: 3, road: "Jl. Gatot Subroto", riskScore: 92, reason: "Heavy cargo traffic + aging pavement (8 years)", preventiveAction: "Full structural evaluation and potential road foundation upgrade." }
  ];

  return (
    <div className="dashboard-grid">
      {/* Left Column: Recent Reports */}
      <section style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <span style={{ fontSize: '1.5rem' }}>🚨</span> Recent Reports
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Search road..." 
              value={searchFilter}
              onChange={handleSearch}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <select value={severityFilter} onChange={handleSeverityChange} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading reports...</div>
        ) : optimisticReports.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666', background: '#f9f9f9', borderRadius: '8px' }}>No reports found matching your criteria.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {optimisticReports.map(report => (
              <div key={report.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '12px', background: '#fafafa', borderLeft: `5px solid ${report.severity === 'High' ? '#dc3545' : report.severity === 'Medium' ? '#ffc107' : '#28a745'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{report.road_name}</strong>
                  <span style={{ fontSize: '0.8rem', background: '#e9ecef', padding: '3px 8px', borderRadius: '12px' }}>{new Date(report.created_at).toLocaleDateString()}</span>
                </div>
                {report.evidence_url && (
                  <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', maxHeight: '200px', display: 'flex', justifyContent: 'center', background: '#000' }}>
                    {report.evidence_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video src={report.evidence_url} controls style={{ width: '100%', objectFit: 'contain' }} />
                    ) : (
                      <img src={report.evidence_url} alt="Evidence" style={{ width: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                )}
                <p style={{ fontSize: '0.9rem', margin: '0 0 10px 0', color: '#555' }}>{report.description}</p>
                <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: '10px', background: 'rgba(0,0,0,0.03)', padding: '6px 10px', borderRadius: '6px', display: 'inline-block' }}>
                  👤 <strong>Reporter:</strong> {report.reporter_name || 'Anonymous Citizen'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#777', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span>⚠️ Severity: <strong>{report.severity}</strong></span>
                    {report.latitude && <span>📍 {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>}
                  </div>
                  <button onClick={() => handleResolve(report)} style={{ padding: '6px 12px', fontSize: '0.85rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#218838'} onMouseLeave={e => e.target.style.background = '#28a745'}>
                    ✓ Resolve
                  </button>
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

      {/* Solved Reports Log */}
      {solvedReports.length > 0 && (
        <section style={{ background: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', gridColumn: '1 / -1', marginTop: '10px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', color: '#28a745' }}>
            <span style={{ fontSize: '1.5rem' }}>✅</span> Solved Reports Log
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {solvedReports.map(report => (
              <div key={`solved-${report.id}`} style={{ padding: '15px', border: '1px solid #c3e6cb', borderRadius: '12px', background: '#d4edda', opacity: 0.8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: '#155724', textDecoration: 'line-through' }}>{report.road_name}</strong>
                  <span style={{ fontSize: '0.75rem', background: '#c3e6cb', color: '#155724', padding: '2px 6px', borderRadius: '10px' }}>Solved</span>
                </div>
                {report.evidence_url && (
                  <div style={{ marginBottom: '10px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #c3e6cb', height: '100px', display: 'flex', justifyContent: 'center', background: '#000', opacity: 0.8 }}>
                    {report.evidence_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video src={report.evidence_url} style={{ width: '100%', objectFit: 'contain' }} />
                    ) : (
                      <img src={report.evidence_url} alt="Evidence" style={{ width: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                )}
                <p style={{ fontSize: '0.85rem', margin: '0 0 8px 0', color: '#155724' }}>{report.description}</p>
                <div style={{ fontSize: '0.8rem', color: '#155724' }}>
                  👤 Reporter: {report.reporter_name || 'Anonymous Citizen'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="container" style={{ padding: '120px 20px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Authority Dashboard</h1>
        <div className="badge" style={{ background: '#0A3A6E', color: 'white', padding: '8px 16px', borderRadius: '20px' }}>
          Live Insights
        </div>
      </div>
      
      <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}>Loading dashboard data...</div>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
