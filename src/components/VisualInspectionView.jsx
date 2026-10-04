import React, { useState } from 'react';
import { 
  Camera, 
  Scan, 
  AlertOctagon, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Send, 
  Sliders, 
  Sparkles,
  Info,
  Maximize2,
  Compass
} from 'lucide-react';

export default function VisualInspectionView({ 
  samples, 
  selectedSampleId, 
  setSelectedSampleId,
  onAskCopilot 
}) {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showLaserSweep, setShowLaserSweep] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showReticle, setShowReticle] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  const selectedSample = samples.find(s => s.id === selectedSampleId) || samples[0];

  const handleTriggerAction = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div>
      {/* GCP Visual Inspection Pipeline Banner */}
      <div style={{
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
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
          <span style={{ color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Camera size={15} color="#38bdf8" /> Google Cloud Vision Pipeline:
          </span>
          <span style={{ color: '#cbd5e1' }}>
            <strong>Vision AI</strong> for real-time defect analysis • <strong>Cloud Storage</strong> for 4K raw frames • <strong>Gemini on Vertex AI</strong> for physical RCA • <strong>Cloud Run</strong> for PLC actuation
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.68rem' }}>
            👁️ Vision AI (Active)
          </span>
          <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)', fontSize: '0.68rem' }}>
            🗄️ Cloud Storage: gs://aura-mes/
          </span>
        </div>
      </div>

      <div className="two-col-layout">
        {/* Left Column: Visual Scanner Viewport */}
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.25rem' }}>
            <div className="panel-header">
              <div className="panel-title-area">
                <Camera size={20} color="#00e5ff" />
                <h2 className="panel-title">Automated Optical Inspection (AOI / NDT)</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-critical" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                  <AlertOctagon size={13} /> {selectedSample.status}
                </span>
              </div>
            </div>

          {/* Visual Sample Thumbnail Gallery Strip */}
          <div className="inspection-sample-strip">
            {samples.map((sample) => {
              const isSelected = sample.id === selectedSample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => setSelectedSampleId(sample.id)}
                  className={`sample-thumb-card ${isSelected ? 'active' : ''}`}
                >
                  <img 
                    src={sample.image} 
                    alt={sample.partName} 
                    className="sample-thumb-preview" 
                  />
                  <div className="sample-thumb-info">
                    <div className="sample-thumb-title">{sample.partName}</div>
                    <div className="sample-thumb-meta">
                      <span className="part-no">{sample.partNumber}</span>
                      <span className="defect-count">{sample.defects.length} Defect(s)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scanner Viewport with image, laser line, and bounding boxes */}
          <div className="inspection-scanner">
            <img 
              src={selectedSample.image} 
              alt={selectedSample.partName} 
              className="inspection-img" 
              style={showHeatmap ? { filter: 'contrast(1.6) saturate(2) hue-rotate(330deg)' } : {}}
            />

            {/* Precision Optical Reticle & Measurement Caliper Overlay */}
            {showReticle && (
              <div className="optical-reticle-overlay">
                <div className="reticle-crosshair-h" />
                <div className="reticle-crosshair-v" />
                <div className="reticle-ring-inner" />
                <div className="reticle-ring-outer" />
                <div className="reticle-corner tl" />
                <div className="reticle-corner tr" />
                <div className="reticle-corner bl" />
                <div className="reticle-corner br" />
                <div className="reticle-scale-x">
                  <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                </div>
              </div>
            )}

            {/* Laser scanning sweep line */}
            {showLaserSweep && <div className="scanner-laser-line" />}

            {/* Bounding Boxes */}
            {showBoundingBoxes && selectedSample.defects.map((defect) => (
              <div
                key={defect.id}
                className="bounding-box"
                style={{
                  top: defect.bbox.top,
                  left: defect.bbox.left,
                  width: defect.bbox.width,
                  height: defect.bbox.height
                }}
                title={`${defect.label} (${(defect.confidence * 100).toFixed(1)}% Confidence)`}
              >
                <div className="bbox-tag">
                  {defect.label}
                </div>
                <div className="bbox-confidence">
                  {(defect.confidence * 100).toFixed(1)}% CONF
                </div>
              </div>
            ))}

            {/* Top overlay metadata badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#38bdf8'
            }}>
              <div>TARGET: {selectedSample.partNumber}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>BATCH: {selectedSample.batchId}</div>
            </div>

            {/* Bottom overlay cycle time */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#34d399'
            }}>
              INFERENCE: {selectedSample.cycleTimeMs} ms • Vertex AI Edge
            </div>
          </div>

          {/* Viewport Control Toggles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className={`btn-secondary ${showBoundingBoxes ? 'active' : ''}`}
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                style={showBoundingBoxes ? { borderColor: '#06b6d4', color: '#00f2fe' } : {}}
              >
                <Scan size={14} /> Bounding Boxes {showBoundingBoxes ? 'ON' : 'OFF'}
              </button>
              <button 
                className={`btn-secondary ${showLaserSweep ? 'active' : ''}`}
                onClick={() => setShowLaserSweep(!showLaserSweep)}
                style={showLaserSweep ? { borderColor: '#06b6d4', color: '#00f2fe' } : {}}
              >
                <Layers size={14} /> Laser Scanner {showLaserSweep ? 'ON' : 'OFF'}
              </button>
              <button 
                className={`btn-secondary ${showHeatmap ? 'active' : ''}`}
                onClick={() => setShowHeatmap(!showHeatmap)}
                style={showHeatmap ? { borderColor: '#f59e0b', color: '#fbbf24' } : {}}
              >
                <Sparkles size={14} /> Heatmap
              </button>
              <button 
                className={`btn-secondary ${showReticle ? 'active' : ''}`}
                onClick={() => setShowReticle(!showReticle)}
                style={showReticle ? { borderColor: '#10b981', color: '#34d399' } : {}}
              >
                <Compass size={14} /> Optical Reticle {showReticle ? 'ON' : 'OFF'}
              </button>
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Source: Industrial 4K Micro-GigE Camera (120 FPS)
            </span>
          </div>
        </div>

        {/* Identified Defects Specs Table */}
        <div className="glass-panel">
          <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              Detected Defect Metrology & Tolerances
            </span>
            <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700 }}>
              {selectedSample.defects.length} DEFECTS FOUND
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {selectedSample.defects.map(d => (
              <div 
                key={d.id} 
                style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)', 
                  borderRadius: '6px', 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fca5a5' }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Measured Size: <strong style={{ color: '#fff' }}>{d.measuredSize}</strong> | Allowed: <span style={{ color: '#ef4444' }}>{d.toleranceLimit}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f87171', fontSize: '0.85rem' }}>
                    {(d.confidence * 100).toFixed(1)}% Match
                  </div>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '1px 6px', borderRadius: '4px' }}>
                    {d.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Gemini Multimodal Root Cause Analysis (RCA) & Closed-Loop Dispatch */}
      <div>
        <div className="glass-panel" style={{ height: '100%' }}>
          <div className="panel-header">
            <div className="panel-title-area">
              <Sparkles size={20} color="#a855f7" />
              <h3 className="panel-title">Gemini 1.5 Multimodal Root-Cause Analysis</h3>
            </div>
            <span className="badge badge-gcp">Vertex AI Reasoning</span>
          </div>

          {actionMessage && (
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              border: '1px solid #10b981', 
              color: '#34d399', 
              padding: '0.65rem 1rem', 
              borderRadius: '6px', 
              marginBottom: '1rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={16} /> {actionMessage}
            </div>
          )}

          {/* Gemini RCA Card */}
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.08)', 
            border: '1px solid rgba(139, 92, 246, 0.25)', 
            borderRadius: '10px', 
            padding: '1.25rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Primary Physical Diagnosis
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '0.85rem', lineHeight: 1.35 }}>
              {selectedSample.geminiRCA.headline}
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1rem' }}>
              {selectedSample.geminiRCA.rootCauseSummary}
            </p>

            <div style={{ background: 'rgba(10, 16, 30, 0.7)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #06b6d4' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>
                Automated Corrective SOP Recommendation:
              </div>
              <p style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                {selectedSample.geminiRCA.recommendedCorrectiveAction}
              </p>
            </div>
          </div>

          {/* Cloud Pub/Sub Dispatched Event Details */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Live Google Cloud Eventarc & Pub/Sub Message
            </div>
            <div className="code-container">
              <div>// Dispatched automatically to Pub/Sub topic</div>
              <div style={{ color: '#38bdf8' }}>Topic: "{selectedSample.geminiRCA.dispatchedPubSubMessage.topic}"</div>
              <div style={{ color: '#a855f7' }}>Event_ID: "{selectedSample.geminiRCA.dispatchedPubSubMessage.eventId}"</div>
              <div>Timestamp: {selectedSample.geminiRCA.dispatchedPubSubMessage.timestamp}</div>
              <div>Status: DISPATCHED_TO_CLOUD_RUN_WORKER</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button 
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '0.7rem' }}
              onClick={() => handleTriggerAction(`Triggered closed-loop PLC corrective cycle for ${selectedSample.partNumber} on ${selectedSample.productionLine}`)}
            >
              <Send size={15} /> Execute Closed-Loop Line Correction via Cloud Run
            </button>

            <button 
              className="btn-secondary"
              style={{ justifyContent: 'center', padding: '0.7rem' }}
              onClick={() => handleTriggerAction(`Quarantine notice sent to ERP/MES for Batch ${selectedSample.batchId}`)}
            >
              <ShieldAlert size={15} color="#fbbf24" /> Quarantine Entire Production Batch ({selectedSample.batchId})
            </button>

            <button 
              className="btn-secondary"
              style={{ justifyContent: 'center', padding: '0.7rem', borderColor: 'rgba(139, 92, 246, 0.4)', color: '#c084fc' }}
              onClick={() => onAskCopilot(`Explain the metallurgical or manufacturing root cause of the failure on ${selectedSample.partName} (${selectedSample.partNumber}). What adjustments to tooling, feed rate, or thermal profile will prevent this?`)}
            >
              <Sparkles size={15} /> Ask Gemini Copilot for Deep SOP Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
