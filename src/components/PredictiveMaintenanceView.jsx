import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Sliders, 
  Wrench, 
  Send, 
  BarChart3, 
  Waves,
  Zap,
  ArrowRight,
  Camera,
  Maximize2,
  FileCode,
  Compass,
  Cpu,
  Layers
} from 'lucide-react';

export default function PredictiveMaintenanceView({ 
  assets, 
  selectedAssetId, 
  setSelectedAssetId,
  onThrottleAsset,
  onGenerateWorkOrder,
  onAskCopilot
}) {
  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];
  const [dispatchNotification, setDispatchNotification] = useState(null);
  const [workbenchView, setWorkbenchView] = useState('photo'); // 'photo' | 'blueprint'
  const [lightboxData, setLightboxData] = useState(null);

  const handleActionClick = (actionName, fn) => {
    fn();
    setDispatchNotification(`${actionName} executed successfully via Cloud Run webhook.`);
    setTimeout(() => setDispatchNotification(null), 4000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy':
        return <span className="badge badge-optimal"><CheckCircle2 size={12} /> NOMINAL</span>;
      case 'warning':
        return <span className="badge badge-warning"><AlertTriangle size={12} /> WARNING</span>;
      case 'critical':
        return <span className="badge badge-critical"><AlertTriangle size={12} /> CRITICAL</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* GCP Predictive Maintenance Pipeline Banner */}
      <div style={{
        background: 'rgba(139, 92, 246, 0.08)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        borderRadius: '10px',
        padding: '0.65rem 1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ color: '#c084fc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={15} color="#c084fc" /> Google Cloud Predictive Workload:
          </span>
          <span style={{ color: '#cbd5e1' }}>
            <strong>Pub/Sub</strong> streaming ingestion • <strong>Dataflow</strong> FFT harmonic pipelines • <strong>BigQuery</strong> sensor lakehouse • <strong>Vertex AI</strong> RUL estimation • <strong>Cloud Run</strong> PLC override
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '0.68rem' }}>
            🧠 Vertex AI RUL: 42h
          </span>
          <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', border: '1px solid rgba(0, 242, 254, 0.3)', fontSize: '0.68rem' }}>
            📡 Pub/Sub: 48.2k/s
          </span>
        </div>
      </div>

      <div className="two-col-layout">
        {/* Left Column: Fleet Asset Selector List with Machinery Thumbnails */}
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <div className="panel-header">
              <div className="panel-title-area">
                <Activity size={20} color="#00e5ff" />
                <h2 className="panel-title">Fleet Asset Health & RUL Index</h2>
              </div>
              <span className="panel-badge">4 Monitored Nodes</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {assets.map((asset) => {
                const isSelected = asset.id === selectedAsset.id;
                const isCrit = asset.status === 'critical';
                const isWarn = asset.status === 'warning';

                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`asset-card-selectable ${isSelected ? 'selected' : ''}`}
                    style={{
                      padding: '0.9rem',
                      borderRadius: '10px',
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(17, 28, 51, 0.95))' 
                        : 'rgba(15, 23, 42, 0.6)',
                      border: isSelected 
                        ? '1px solid #06b6d4' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                      {/* Machinery Image Thumbnail */}
                      <div className="asset-thumb-container">
                        <img 
                          src={asset.image} 
                          alt={asset.name} 
                          className="asset-thumb-img" 
                        />
                        <span className={`thumb-status-dot ${asset.status}`} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8', fontSize: '0.8rem' }}>
                                [{asset.id}]
                              </span>
                              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {asset.name}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#d4af37', marginTop: '1px' }}>
                              {asset.manufacturer || 'Industrial Grade'}
                            </div>
                          </div>
                          {getStatusBadge(asset.status)}
                        </div>

                        {/* Health Score & RUL Bar */}
                        <div style={{ marginTop: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '3px' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>
                              RUL:
                            </span>
                            <span style={{ 
                              fontFamily: 'var(--font-mono)', 
                              fontWeight: 700, 
                              color: isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981' 
                            }}>
                              {asset.rulHours}h remaining
                            </span>
                          </div>

                          <div style={{ height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${Math.min(100, (asset.rulHours / 500) * 100)}%`, 
                                height: '100%',
                                background: isCrit 
                                  ? 'linear-gradient(90deg, #ef4444, #f87171)' 
                                  : isWarn 
                                    ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' 
                                    : 'linear-gradient(90deg, #10b981, #34d399)'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', fontSize: '0.7rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                      <span>Comp: <strong style={{ color: '#cbd5e1' }}>{asset.criticalComponent}</strong></span>
                      <span>Health: <strong style={{ color: '#38bdf8' }}>{asset.healthScore}/100</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BigQuery ML Degradation Analysis Box */}
          <div className="glass-panel">
            <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} /> BigQuery ML Degradation Predictor
              </span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Model: BOOSTED_TREE_REGRESSOR</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Continuous feature vector training on 365 days of 10kHz vibration, thermal cycles, and lubricant viscosity curves. Predicts bearing raceway flaking with <strong>98.2% accuracy</strong> 36 hours before catastrophic seizure.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Telemetry Workbench & Visual Equipment Showcase */}
        <div>
          <div className="glass-panel">
            <div className="panel-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h3 className="panel-title">{selectedAsset.name}</h3>
                  {getStatusBadge(selectedAsset.status)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Manufacturer: <span style={{ color: '#d4af37', fontWeight: 600 }}>{selectedAsset.manufacturer}</span> • {selectedAsset.location}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn-secondary"
                  onClick={() => handleActionClick('Feed Rate Throttle', () => onThrottleAsset(selectedAsset.id))}
                  title="Send closed-loop command to PLC gateway"
                >
                  <Sliders size={14} /> Throttle Speed -25%
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleActionClick('SAP Work-Order Dispatch', () => onGenerateWorkOrder(selectedAsset.id))}
                >
                  <Wrench size={14} /> Dispatch Work-Order
                </button>
              </div>
            </div>

            {dispatchNotification && (
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.15)', 
                border: '1px solid #10b981', 
                color: '#34d399', 
                padding: '0.6rem 1rem', 
                borderRadius: '6px', 
                marginBottom: '1rem',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={16} /> {dispatchNotification}
              </div>
            )}

            {/* Visual Equipment & CAD Blueprint Interactive Showcase */}
            <div className="equipment-visual-showcase">
              <div className="equipment-visual-toolbar">
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    className={`btn-workbench-tab ${workbenchView === 'photo' ? 'active' : ''}`}
                    onClick={() => setWorkbenchView('photo')}
                  >
                    <Camera size={13} /> Machine Photographic View
                  </button>
                  <button 
                    className={`btn-workbench-tab ${workbenchView === 'blueprint' ? 'active' : ''}`}
                    onClick={() => setWorkbenchView('blueprint')}
                  >
                    <FileCode size={13} /> Precision CAD Blueprint
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spec-tag">{selectedAsset.installedYear ? `Installed ${selectedAsset.installedYear}` : 'Edge Node'}</span>
                  <button 
                    className="btn-classic-icon"
                    onClick={() => setLightboxData({
                      title: workbenchView === 'photo' ? `${selectedAsset.name} — Machinery Live Cam` : `${selectedAsset.criticalComponent} — Precision CAD Schematic`,
                      src: workbenchView === 'photo' ? selectedAsset.image : selectedAsset.cadImage
                    })}
                    title="Click to Zoom Fullscreen"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Viewport content */}
              {workbenchView === 'photo' ? (
                <div 
                  className="equipment-photo-container"
                  onClick={() => setLightboxData({
                    title: `${selectedAsset.name} — Machinery Live Cam`,
                    src: selectedAsset.image
                  })}
                >
                  <img 
                    src={selectedAsset.image} 
                    alt={selectedAsset.name} 
                    className="equipment-photo-img" 
                  />
                  <div className="equipment-photo-overlay">
                    <div className="equipment-tag-top">
                      <span className="model-badge">SPEC: {selectedAsset.specSheet}</span>
                    </div>
                    <div className="equipment-tag-bottom">
                      <div className="telemetry-pill">
                        <span>VIB:</span> <strong>{selectedAsset.metrics.vibration.value} {selectedAsset.metrics.vibration.unit}</strong>
                      </div>
                      <div className="telemetry-pill">
                        <span>TEMP:</span> <strong>{selectedAsset.metrics.temperature.value} {selectedAsset.metrics.temperature.unit}</strong>
                      </div>
                      <div className="telemetry-pill">
                        <span>HYD:</span> <strong>{selectedAsset.metrics.hydraulicPressure.value} {selectedAsset.metrics.hydraulicPressure.unit}</strong>
                      </div>
                      <span className="click-zoom-badge"><Maximize2 size={11} /> Click to Enlarge</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className="equipment-blueprint-container"
                  onClick={() => setLightboxData({
                    title: `${selectedAsset.criticalComponent} — Precision Engineering CAD Blueprint`,
                    src: selectedAsset.cadImage
                  })}
                >
                  <img 
                    src={selectedAsset.cadImage} 
                    alt="Precision Engineering Blueprint" 
                    className="equipment-blueprint-img" 
                  />
                  <div className="blueprint-overlay-hud">
                    <div className="blueprint-header-tag">
                      <span>DIN ISO 2768-m / ABEC 7 (P4) SPECIFICATION</span>
                    </div>
                    <div className="blueprint-callout-box">
                      <div style={{ color: '#00e5ff', fontWeight: 700, fontSize: '0.75rem', marginBottom: '2px' }}>
                        CRITICAL INSPECTION REGION:
                      </div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.72rem' }}>
                        {selectedAsset.criticalComponent} — {selectedAsset.failureMode}
                      </div>
                      <div style={{ color: '#f87171', fontSize: '0.7rem', marginTop: '3px' }}>
                        Defect amplitude: {selectedAsset.metrics.vibration.value} mm/s (Trip limit: 7.1 mm/s)
                      </div>
                    </div>
                    <span className="blueprint-zoom-badge"><Maximize2 size={11} /> Click to Enlarge Blueprint</span>
                  </div>
                </div>
              )}
            </div>

            {/* Real-time telemetry sparkline tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Vibration Tile */}
              <div className="telemetry-chart-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Vibration Velocity (RMS)</span>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: 800, 
                    fontSize: '1.1rem',
                    color: selectedAsset.metrics.vibration.status === 'critical' ? '#ef4444' : selectedAsset.metrics.vibration.status === 'warning' ? '#f59e0b' : '#34d399'
                  }}>
                    {selectedAsset.metrics.vibration.value} {selectedAsset.metrics.vibration.unit}
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Threshold Limit: {selectedAsset.metrics.vibration.normalMax} mm/s RMS (ISO 10816-3 Class II)
                </div>
              
              {/* Dynamic SVG Sparkline */}
              <svg className="sparkline-svg" viewBox="0 0 300 70">
                <defs>
                  <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M 0,${65 - (selectedAsset.metrics.vibration.history[0] * 6)} 
                      L 50,${65 - (selectedAsset.metrics.vibration.history[1] * 6)} 
                      L 100,${65 - (selectedAsset.metrics.vibration.history[2] * 6)} 
                      L 150,${65 - (selectedAsset.metrics.vibration.history[3] * 6)} 
                      L 220,${65 - (selectedAsset.metrics.vibration.history[4] * 6)} 
                      L 300,${65 - (selectedAsset.metrics.vibration.history[5] * 6)} 
                      L 300,70 L 0,70 Z`}
                  fill="url(#vibGrad)" 
                />
                <path 
                  d={`M 0,${65 - (selectedAsset.metrics.vibration.history[0] * 6)} 
                      L 50,${65 - (selectedAsset.metrics.vibration.history[1] * 6)} 
                      L 100,${65 - (selectedAsset.metrics.vibration.history[2] * 6)} 
                      L 150,${65 - (selectedAsset.metrics.vibration.history[3] * 6)} 
                      L 220,${65 - (selectedAsset.metrics.vibration.history[4] * 6)} 
                      L 300,${65 - (selectedAsset.metrics.vibration.history[5] * 6)}`}
                  fill="none" 
                  stroke={selectedAsset.metrics.vibration.status === 'critical' ? '#ef4444' : selectedAsset.metrics.vibration.status === 'warning' ? '#f59e0b' : '#00f2fe'} 
                  strokeWidth="2.5" 
                />
                {/* Current Value Dot */}
                <circle 
                  cx="300" 
                  cy={65 - (selectedAsset.metrics.vibration.history[5] * 6)} 
                  r="4" 
                  fill={selectedAsset.metrics.vibration.status === 'critical' ? '#ef4444' : '#00f2fe'} 
                  stroke="#fff" 
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Temperature Tile */}
            <div className="telemetry-chart-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Operating Temperature</span>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 800, 
                  fontSize: '1.1rem',
                  color: selectedAsset.metrics.temperature.status === 'critical' ? '#ef4444' : selectedAsset.metrics.temperature.status === 'warning' ? '#f59e0b' : '#34d399'
                }}>
                  {selectedAsset.metrics.temperature.value} {selectedAsset.metrics.temperature.unit}
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Normal Max: {selectedAsset.metrics.temperature.normalMax} °C
              </div>

              <svg className="sparkline-svg" viewBox="0 0 300 70">
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M 0,${65 - ((selectedAsset.metrics.temperature.history[0] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 50,${65 - ((selectedAsset.metrics.temperature.history[1] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 100,${65 - ((selectedAsset.metrics.temperature.history[2] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 150,${65 - ((selectedAsset.metrics.temperature.history[3] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 220,${65 - ((selectedAsset.metrics.temperature.history[4] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 300,${65 - ((selectedAsset.metrics.temperature.history[5] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 300,70 L 0,70 Z`}
                  fill="url(#tempGrad)" 
                />
                <path 
                  d={`M 0,${65 - ((selectedAsset.metrics.temperature.history[0] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 50,${65 - ((selectedAsset.metrics.temperature.history[1] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 100,${65 - ((selectedAsset.metrics.temperature.history[2] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 150,${65 - ((selectedAsset.metrics.temperature.history[3] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 220,${65 - ((selectedAsset.metrics.temperature.history[4] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                      L 300,${65 - ((selectedAsset.metrics.temperature.history[5] / selectedAsset.metrics.temperature.normalMax) * 45)}`}
                  fill="none" 
                  stroke="#a855f7" 
                  strokeWidth="2.5" 
                />
                <circle 
                  cx="300" 
                  cy={65 - ((selectedAsset.metrics.temperature.history[5] / selectedAsset.metrics.temperature.normalMax) * 45)} 
                  r="4" 
                  fill="#a855f7" 
                  stroke="#fff" 
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Fast Fourier Transform (FFT) Frequency Spectrum */}
          <div style={{ background: 'rgba(10, 16, 30, 0.7)', borderRadius: '10px', padding: '1.15rem', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Waves size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Google Cloud Dataflow: Real-Time FFT Harmonics Spectrum
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                Sampling: 10,000 Hz / Window: 5.0s
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '110px', paddingBottom: '0.5rem', borderBottom: '1px solid #1e293b' }}>
              {selectedAsset.spectrumFrequencies.map((f, idx) => {
                const heightPct = Math.min(100, (f.amp / 9.0) * 100);
                const isPeakDefect = f.amp > 3.0;

                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: isPeakDefect ? '#ef4444' : '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
                      {f.amp} mm/s
                    </span>
                    <div 
                      style={{ 
                        width: '100%', 
                        maxWidth: '48px', 
                        height: `${Math.max(12, heightPct)}%`, 
                        borderRadius: '4px 4px 0 0',
                        background: isPeakDefect 
                          ? 'linear-gradient(180deg, #ef4444, #b91c1c)' 
                          : 'linear-gradient(180deg, #06b6d4, #0369a1)',
                        boxShadow: isPeakDefect ? '0 0 14px rgba(239, 68, 68, 0.6)' : 'none',
                        transition: 'height 0.4s ease'
                      }}
                    />
                    <span style={{ fontSize: '0.65rem', color: isPeakDefect ? '#fca5a5' : '#64748b', marginTop: '6px', textAlign: 'center', fontWeight: 600 }}>
                      {f.freq}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.65rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Defect Signature Detection: <strong>{selectedAsset.failureMode}</strong></span>
              <span style={{ color: '#38bdf8' }}>Identified by Dataflow Sliding Window + Vertex AI</span>
            </div>
          </div>

          {/* Autonomous Action & Gemini Copilot Dispatch Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.12))', 
            border: '1px solid rgba(139, 92, 246, 0.35)', 
            borderRadius: '10px', 
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#c084fc', marginBottom: '2px' }}>
                <Zap size={14} /> Gemini Recommended Intervention
              </div>
              <div style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>
                {selectedAsset.recommendedAction}
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ whiteSpace: 'nowrap', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}
              onClick={() => onAskCopilot(`Diagnose root cause and formulate step-by-step SOP work instructions for ${selectedAsset.name} (${selectedAsset.criticalComponent}). Telemetry shows vibration at ${selectedAsset.metrics.vibration.value} ${selectedAsset.metrics.vibration.unit}.`)}
            >
              Consult Gemini Copilot <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* Lightbox Modal for Fullscreen Machinery / CAD Inspection */}
    {lightboxData && (
      <div className="classic-lightbox-overlay" onClick={() => setLightboxData(null)}>
        <div className="classic-lightbox-content" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#00e5ff" />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                {lightboxData.title}
              </span>
            </div>
            <button className="btn-close" onClick={() => setLightboxData(null)}>✕</button>
          </div>
          <div className="lightbox-image-box">
            <img 
              src={lightboxData.src} 
              alt={lightboxData.title} 
              style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
          <div className="lightbox-footer">
            <span>High-Resolution Engineering Asset &bull; Monitored Node: [{selectedAsset.id}] {selectedAsset.name}</span>
            <span style={{ color: '#38bdf8' }}>Vertex AI Grounding &bull; ISO 10816 Class II Diagnostic Standard</span>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

