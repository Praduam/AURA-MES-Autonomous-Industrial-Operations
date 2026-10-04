import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Radio, 
  Layers, 
  Maximize2, 
  Minimize2, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck, 
  AlertTriangle, 
  Camera, 
  Compass, 
  Cpu, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FACILITY_DATA } from '../data/mockFactoryData';

export default function FacilityHeroBanner({ assets, onSelectAsset }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedBay, setSelectedBay] = useState('bay-3');
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString().slice(17, 25));
  const [showImageLightbox, setShowImageLightbox] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString().slice(17, 25));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bays = [
    { id: 'bay-1', label: 'Bay 01 • Stamping Press', machineId: 'ROB-02', status: 'optimal', desc: 'Robotic automated stamping cell' },
    { id: 'bay-2', label: 'Bay 02 • Precision Grinding', machineId: null, status: 'rejected', desc: 'Optical AOI & NDT defect quarantine' },
    { id: 'bay-3', label: 'Bay 03 • 5-Axis CNC Cell', machineId: 'CNC-04', status: 'warning', desc: 'Aerospace machining — spindle vibration monitored' },
    { id: 'bay-4', label: 'Bay 04 • Cleanroom SMT', machineId: null, status: 'warning', desc: 'High-speed pick & place + reflow' },
    { id: 'bay-5', label: 'Bay 05 • Aerospace Assembly', machineId: null, status: 'optimal', desc: 'Precision avionics & structural integration' },
    { id: 'bay-cogen', label: 'Sub-Plant • Energy Co-Gen', machineId: 'TBN-01', status: 'critical', desc: '62MW gas turbine & thermal co-generation' },
  ];

  return (
    <div className="facility-hero-container">
      {/* Top Banner Navigation & Facility Metadata Strip */}
      <div className="facility-strip">
        <div className="facility-strip-left">
          <div className="classic-facility-emblem">
            <Building2 size={16} />
          </div>
          <div>
            <div className="facility-heading-row">
              <span className="classic-title">{FACILITY_DATA.name}</span>
              <span className="classic-tag-gold">DIGITAL TWIN V4.8</span>
              <span className="classic-tag-cyan">ENTERPRISE GRADE</span>
            </div>
            <div className="facility-subline">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} color="#d4af37" /> {FACILITY_DATA.campus} • {FACILITY_DATA.location}
              </span>
              <span className="separator">•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color="#38bdf8" /> UTC {currentTime} (CET: Shift 02 Active)
              </span>
              <span className="separator">•</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>
                Pub/Sub Telemetry Latency: {FACILITY_DATA.networkLatency}
              </span>
            </div>
          </div>
        </div>

        <div className="facility-strip-right">
          <button 
            className="btn-classic-ghost"
            onClick={() => setShowImageLightbox(true)}
            title="Inspect 8K High-Resolution Facility Photograph"
          >
            <Camera size={14} /> View Facility Cam
          </button>
          <button 
            className="btn-classic-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Plant Facility View' : 'Collapse Plant Facility View'}
          >
            {isCollapsed ? (
              <>
                <ChevronDown size={14} /> Show Facility Overview
              </>
            ) : (
              <>
                <ChevronUp size={14} /> Hide Overview
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Facility Digital Twin Showcase */}
      {!isCollapsed && (
        <div className="facility-showcase-grid">
          {/* Left: High-Resolution Facility Photograph with Technical HUD Overlay */}
          <div className="facility-viewport-card" onClick={() => setShowImageLightbox(true)}>
            <div className="facility-image-wrapper">
              <img 
                src={FACILITY_DATA.facilityImage} 
                alt="AURA Smart Industrial Facility Overview" 
                className="facility-image"
              />
              <div className="facility-image-vignette" />

              {/* Technical HUD Grid Overlay */}
              <div className="facility-hud-header">
                <div className="hud-badge-left">
                  <div className="live-dot" />
                  <span>LIVE FACILITY TWIN CAM #01 • WIDE ANGLE 4K</span>
                </div>
                <div className="hud-badge-right">
                  <span>FACILITY ISO 9001 / EN 9100 COMPLIANT</span>
                </div>
              </div>

              {/* Machinery Hotspots on Floor */}
              <div className="hud-hotspot bay-3-spot" title="Bay 3: CNC-04 5-Axis Milling Center">
                <span className="hotspot-pulse warning" />
                <span className="hotspot-label">BAY 03: CNC-04 (VIB WARN)</span>
              </div>

              <div className="hud-hotspot bay-cogen-spot" title="Sub-Plant: 62MW Gas Turbine TBN-01">
                <span className="hotspot-pulse critical" />
                <span className="hotspot-label">CO-GEN: TBN-01 (1142°C CRIT)</span>
              </div>

              <div className="hud-hotspot bay-1-spot" title="Bay 1: Stamping Press ROB-02">
                <span className="hotspot-pulse optimal" />
                <span className="hotspot-label">BAY 01: ROB-02 (NOMINAL)</span>
              </div>

              <div className="facility-hud-footer">
                <div className="hud-metric-pill">
                  <span className="label">ACTIVE OPERATIONAL BAYS:</span>
                  <span className="val">6 OF 6 ONLINE</span>
                </div>
                <div className="hud-metric-pill">
                  <span className="label">PLANT RELIABILITY INDEX:</span>
                  <span className="val" style={{ color: '#34d399' }}>94.2%</span>
                </div>
                <div className="hud-metric-pill">
                  <span className="label">AI AUTONOMOUS LOOP:</span>
                  <span className="val" style={{ color: '#00f2fe' }}>VERTEX AI ACTIVE</span>
                </div>
                <span className="hud-expand-hint">
                  <Maximize2 size={13} /> Click to Expand
                </span>
              </div>
            </div>
          </div>

          {/* Right: Classic Bay Navigator & Shift Telemetry */}
          <div className="facility-bay-panel">
            <div className="bay-panel-header">
              <span className="bay-panel-title">
                <Layers size={15} color="#d4af37" /> Production Bays & Sub-Plants
              </span>
              <span className="classic-roman-badge">FACILITY CLASS: AEROSPACE A1</span>
            </div>

            <div className="bay-list-scroll">
              {bays.map((bay) => {
                const isSelected = selectedBay === bay.id;
                return (
                  <div 
                    key={bay.id} 
                    className={`bay-item-card ${isSelected ? 'active' : ''} ${bay.status}`}
                    onClick={() => {
                      setSelectedBay(bay.id);
                      if (bay.machineId && onSelectAsset) {
                        onSelectAsset(bay.machineId);
                      }
                    }}
                  >
                    <div className="bay-item-top">
                      <span className="bay-item-name">{bay.label}</span>
                      <span className={`bay-status-badge ${bay.status}`}>
                        {bay.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="bay-item-desc">{bay.desc}</div>
                    {bay.machineId && (
                      <div className="bay-linked-asset">
                        <span>Linked Node: <strong>[{bay.machineId}]</strong></span>
                        <span className="click-view-hint">Inspect Telemetry &rarr;</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="facility-manager-card">
              <div className="manager-avatar">EV</div>
              <div>
                <div className="manager-name">{FACILITY_DATA.plantManager}</div>
                <div className="manager-title">Supervising Munich & Austin Autonomous Edge Clusters</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Modal / Lightbox for Facility Cam */}
      {showImageLightbox && (
        <div className="classic-lightbox-overlay" onClick={() => setShowImageLightbox(false)}>
          <div className="classic-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} color="#d4af37" />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {FACILITY_DATA.name} — Digital Twin Optical Telemetry
                </span>
              </div>
              <button className="btn-close" onClick={() => setShowImageLightbox(false)}>✕</button>
            </div>
            <div className="lightbox-image-box">
              <img 
                src={FACILITY_DATA.facilityImage} 
                alt="Full High-Resolution Facility Camera" 
                style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <div className="lightbox-footer">
              <span>Sensor Feed: 4K Optical RTMP Stream &bull; Timestamp: {new Date().toISOString()}</span>
              <span style={{ color: '#d4af37' }}>Munich High-Precision Machining & Aerospace Cleanroom Campus</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
