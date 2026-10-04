import React from 'react';
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
  Cpu
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
  return (
    <header className="top-nav">
      <div className="brand-section">
        <div className="brand-badge">
          <Cpu size={24} />
        </div>
        <div className="brand-text">
          <h1>
            AURA-MES
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '4px', padding: '1px 6px' }}>
              v2.4 AI-ENTERPRISE
            </span>
          </h1>
          <div className="brand-tagline">
            Autonomous Industrial Operations & Efficiency 
            <span className="gcp-tag">
              <Cloud size={11} /> Google Cloud Vertex AI & Gemini
            </span>
          </div>
        </div>
      </div>

      <nav className="nav-tabs" aria-label="Navigation Tabs">
        <button 
          className={`nav-tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          <Activity size={16} />
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
          <Camera size={16} />
          Visual Quality Control
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'copilot' ? 'active' : ''}`}
          onClick={() => setActiveTab('copilot')}
        >
          <Bot size={16} />
          Gemini Operations Copilot
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'sustainability' ? 'active' : ''}`}
          onClick={() => setActiveTab('sustainability')}
        >
          <TrendingUp size={16} />
          OEE & Sustainability
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Cloud size={16} />
          GCP AI Architecture
        </button>
      </nav>

      <div className="status-pill-group">
        <div className="live-badge">
          <div className="live-dot" />
          <span>PUBSUB STREAM: LIVE</span>
        </div>

        <button 
          className={`btn-secondary ${isAutonomousActive ? 'pulse-green' : ''}`}
          onClick={() => setIsAutonomousActive(!isAutonomousActive)}
          title="Toggle closed-loop autonomous dispatch from Vertex AI to PLC"
          style={isAutonomousActive ? { borderColor: '#10b981', color: '#34d399' } : {}}
        >
          <Zap size={14} />
          {isAutonomousActive ? 'Autonomous: Active' : 'Autonomous: Off'}
        </button>

        <button 
          className="btn-secondary" 
          onClick={onSimulateAnomaly}
          title="Simulate sudden bearing vibration spike on CNC-04"
          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}
        >
          <AlertTriangle size={14} color="#f87171" />
          Inject Anomaly
        </button>

        <button 
          className="btn-secondary" 
          onClick={onResetNominal}
          title="Reset factory fleet to nominal operating profile"
        >
          <RotateCcw size={14} />
          Reset Fleet
        </button>
      </div>
    </header>
  );
}
