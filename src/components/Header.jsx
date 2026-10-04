import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Camera, 
  Bot, 
  TrendingUp, 
  Cloud, 
  AlertTriangle, 
  RotateCcw, 
  Zap, 
  ShieldCheck,
  Cpu,
  Building2,
  ChevronDown,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onSimulateAnomaly, 
  onResetNominal,
  isAutonomousActive,
  setIsAutonomousActive,
  criticalCount
}) {
  const [selectedFacility, setSelectedFacility] = useState('Munich Alpha (Aerospace)');
  const [clockStr, setClockStr] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const t = setInterval(() => {
      setClockStr(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="top-nav">
      <div className="brand-section">
        <div className="classic-brand-crest">
          <div className="crest-inner">
            <Cpu size={20} color="#d4af37" />
          </div>
        </div>
        <div className="brand-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className="classic-brand-title">
              AURA<span style={{ color: '#d4af37' }}>-</span>MES
            </h1>
            <span className="classic-edition-badge">
              ENTERPRISE AI
            </span>
          </div>
          <div className="brand-tagline">
            Autonomous Industrial Operations &bull; 
            <span className="gcp-tag">
              <Cloud size={11} /> Vertex AI & Gemini
            </span>
          </div>
        </div>
      </div>

      <nav className="nav-tabs" aria-label="Navigation Tabs">
        <button 
          className={`nav-tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          <Activity size={15} />
          Predictive Maintenance
          {criticalCount > 0 && (
            <span style={{ background: '#ef4444', color: '#fff', borderRadius: '999px', fontSize: '0.65rem', padding: '0 5px', fontWeight: 700 }}>
              {criticalCount}
            </span>
          )}
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
          onClick={() => setActiveTab('vision')}
        >
          <Camera size={15} />
          Visual Quality Control
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'copilot' ? 'active' : ''}`}
          onClick={() => setActiveTab('copilot')}
        >
          <Bot size={15} />
          Gemini Operations Copilot
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'sustainability' ? 'active' : ''}`}
          onClick={() => setActiveTab('sustainability')}
        >
          <TrendingUp size={15} />
          OEE & Sustainability
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Cloud size={15} />
          GCP AI Architecture
        </button>
      </nav>

      <div className="status-pill-group">
        {/* Plant facility selector */}
        <div className="facility-selector-dropdown">
          <Building2 size={13} color="#d4af37" />
          <select 
            value={selectedFacility} 
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="classic-facility-select"
          >
            <option value="Munich Alpha (Aerospace)">Munich Alpha (Aerospace)</option>
            <option value="Austin Smart Foundry (Bay 1-4)">Austin Smart Foundry</option>
            <option value="Tokyo Precision Machining">Tokyo Precision Bay</option>
          </select>
        </div>

        <div className="live-badge">
          <div className="live-dot" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>{clockStr}</span>
        </div>

        <button 
          className={`btn-classic-action ${isAutonomousActive ? 'active-pulse' : ''}`}
          onClick={() => setIsAutonomousActive(!isAutonomousActive)}
          title="Toggle closed-loop autonomous dispatch from Vertex AI to PLC"
        >
          <Zap size={13} color={isAutonomousActive ? '#34d399' : '#94a3b8'} />
          {isAutonomousActive ? 'Autonomous: On' : 'Manual Mode'}
        </button>

        <button 
          className="btn-classic-anomaly" 
          onClick={onSimulateAnomaly}
          title="Simulate sudden bearing vibration spike on CNC-04"
        >
          <AlertTriangle size={13} color="#f87171" />
          Inject Anomaly
        </button>

        <button 
          className="btn-classic-reset" 
          onClick={onResetNominal}
          title="Reset factory fleet to nominal operating profile"
        >
          <RotateCcw size={13} />
          Reset Fleet
        </button>
      </div>
    </header>
  );
}

