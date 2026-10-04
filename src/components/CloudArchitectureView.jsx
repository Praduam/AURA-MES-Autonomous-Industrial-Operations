import React, { useState } from 'react';
import { 
  Cloud, 
  Radio, 
  Database, 
  Cpu, 
  Bot, 
  Server, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  Workflow,
  ArrowRight,
  ShieldCheck,
  Zap,
  HardDrive,
  Camera,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  Activity
} from 'lucide-react';
import { SUGGESTED_GCP_TECHNOLOGIES } from '../data/mockFactoryData';

export default function CloudArchitectureView({ stack }) {
  const [selectedNodeId, setSelectedNodeId] = useState('gemini');
  const [filterCategory, setFilterCategory] = useState('suggested'); // 'suggested', 'all', 'ai', 'data', 'compute'
  const [copied, setCopied] = useState(false);

  const filteredStack = stack.filter(node => {
    if (filterCategory === 'suggested') {
      return node.suggested === true;
    }
    if (filterCategory === 'ai') {
      return ['gemini', 'vertex-ai', 'vision-ai'].includes(node.id);
    }
    if (filterCategory === 'data') {
      return ['pubsub', 'dataflow', 'bigquery', 'cloud-storage'].includes(node.id);
    }
    if (filterCategory === 'compute') {
      return ['cloud-run', 'firestore', 'firebase'].includes(node.id);
    }
    return true;
  });

  const selectedNode = stack.find(n => n.id === selectedNodeId) || stack[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNode.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getNodeIcon = (id) => {
    switch (id) {
      case 'gemini':
        return <Sparkles size={20} color="#ec4899" />;
      case 'vertex-ai':
        return <Cpu size={20} color="#a855f7" />;
      case 'bigquery':
        return <Database size={20} color="#818cf8" />;
      case 'cloud-storage':
        return <HardDrive size={20} color="#06b6d4" />;
      case 'vision-ai':
        return <Camera size={20} color="#38bdf8" />;
      case 'pubsub':
        return <Radio size={20} color="#00f2fe" />;
      case 'dataflow':
        return <Workflow size={20} color="#34d399" />;
      case 'cloud-run':
        return <Server size={20} color="#10b981" />;
      case 'firestore':
        return <Database size={20} color="#fbbf24" />;
      case 'firebase':
        return <Flame size={20} color="#f59e0b" />;
      default:
        return <Cloud size={20} color="#06b6d4" />;
    }
  };

  return (
    <div>
      {/* Top Architecture Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(139, 92, 246, 0.15))',
        border: '1px solid rgba(66, 133, 244, 0.35)',
        borderRadius: '14px',
        padding: '1.35rem 1.75rem',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
          <div style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '14px', 
            background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.3), rgba(168, 85, 247, 0.3))', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#60a5fa',
            border: '1px solid rgba(96, 165, 250, 0.4)'
          }}>
            <Cloud size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Suggested Google Cloud Technologies Architecture
              </h2>
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.7rem' }}>
                Enterprise Blueprint
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px' }}>
              Purpose-built industrial intelligence stack orchestrated for zero unplanned downtime and autonomous factory efficiency.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            ✨ Gemini on Vertex AI
          </span>
          <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            🧠 Vertex AI
          </span>
          <span className="badge" style={{ background: 'rgba(129, 140, 248, 0.15)', color: '#a5b4fc', border: '1px solid rgba(129, 140, 248, 0.3)' }}>
            📊 BigQuery
          </span>
          <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            🗄️ Cloud Storage
          </span>
          <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            👁️ Vision AI
          </span>
          <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
            📡 Pub/Sub
          </span>
          <span className="badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
            🌊 Dataflow
          </span>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            ⚡ Cloud Run
          </span>
        </div>
      </div>

      {/* Suggested Google Cloud Technologies 8-Pillar Interactive Matrix */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(17, 28, 51, 0.85), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#00f2fe" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
              Suggested Google Cloud Technologies & Operational Roles
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            8 CORE SERVICES • CLICK ANY SERVICE TO INSPECT CODE & PIPELINE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
          {SUGGESTED_GCP_TECHNOLOGIES.map((tech) => {
            const isSelected = selectedNodeId === tech.id;
            return (
              <div
                key={tech.id}
                onClick={() => setSelectedNodeId(tech.id)}
                style={{
                  background: isSelected ? 'rgba(6, 182, 212, 0.14)' : 'rgba(10, 16, 30, 0.65)',
                  border: isSelected ? `1px solid ${tech.color}` : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? `0 0 16px ${tech.color}33` : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getNodeIcon(tech.id)}
                      <strong style={{ fontSize: '0.88rem', color: isSelected ? '#fff' : '#f1f5f9' }}>
                        {tech.name}
                      </strong>
                    </div>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      background: `${tech.color}22`, 
                      color: tech.color, 
                      fontWeight: 700 
                    }}>
                      {tech.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.45, margin: 0 }}>
                    <strong style={{ color: '#cbd5e1' }}>Role:</strong> {tech.role}
                  </p>
                </div>
                <div style={{ 
                  marginTop: '0.6rem', 
                  fontSize: '0.7rem', 
                  color: isSelected ? tech.color : '#64748b', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {isSelected ? '● Currently Inspecting' : 'Click to view code & telemetry →'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs for Blueprint */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '0.25rem' }}>
          <SlidersHorizontal size={14} color="#94a3b8" />
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Filter Blueprint:</span>
        </div>
        <button 
          className={`btn-secondary ${filterCategory === 'suggested' ? 'active' : ''}`}
          onClick={() => setFilterCategory('suggested')}
          style={filterCategory === 'suggested' ? { borderColor: '#06b6d4', color: '#00f2fe' } : {}}
        >
          ⭐ 8 Suggested Google Cloud Technologies
        </button>
        <button 
          className={`btn-secondary ${filterCategory === 'ai' ? 'active' : ''}`}
          onClick={() => setFilterCategory('ai')}
          style={filterCategory === 'ai' ? { borderColor: '#ec4899', color: '#f472b6' } : {}}
        >
          🤖 AI & Reasoning (Gemini, Vertex AI, Vision AI)
        </button>
        <button 
          className={`btn-secondary ${filterCategory === 'data' ? 'active' : ''}`}
          onClick={() => setFilterCategory('data')}
          style={filterCategory === 'data' ? { borderColor: '#34d399', color: '#34d399' } : {}}
        >
          📊 Big Data (Pub/Sub, Dataflow, BigQuery, Storage)
        </button>
        <button 
          className={`btn-secondary ${filterCategory === 'compute' ? 'active' : ''}`}
          onClick={() => setFilterCategory('compute')}
          style={filterCategory === 'compute' ? { borderColor: '#10b981', color: '#34d399' } : {}}
        >
          🚀 Application & Live State (Cloud Run, Firestore, Firebase)
        </button>
        <button 
          className={`btn-secondary ${filterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCategory('all')}
          style={filterCategory === 'all' ? { borderColor: '#a855f7', color: '#c084fc' } : {}}
        >
          View All 10 Nodes
        </button>
      </div>

      <div className="two-col-layout">
        {/* Left Column: Interactive Cloud Pipeline Flow */}
        <div>
          <div className="glass-panel" style={{ marginBottom: '1.25rem' }}>
            <div className="panel-header">
              <div className="panel-title-area">
                <Workflow size={20} color="#00e5ff" />
                <h3 className="panel-title">End-to-End Industrial Dataflow</h3>
              </div>
              <span className="panel-badge">{filteredStack.length} Components</span>
            </div>

            <div className="arch-flow">
              {filteredStack.map((node) => {
                const isSelected = node.id === selectedNode.id;

                return (
                  <div
                    key={node.id}
                    className={`arch-node ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <div className="arch-icon">
                      {getNodeIcon(node.id)}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#38bdf8' : '#fff' }}>
                            {node.name}
                          </span>
                          {node.suggested && (
                            <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '1px 5px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                              GCP Core
                            </span>
                          )}
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>
                          {node.metric}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
                        <strong>Role:</strong> {node.role}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                        Tech: {node.tech}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Industrial Cyber-Physical Dataflow Chain Diagram */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title-area">
                <Activity size={18} color="#34d399" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Cyber-Physical Architecture Lifecycle
                </h4>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Real-Time Data Pipeline</span>
            </div>
            
            <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.2)', color: '#00f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>1</span>
                <div>
                  <strong style={{ color: '#00f2fe' }}>Pub/Sub & Cloud Storage</strong>: 140 edge IoT sensors and 4K optical cameras stream high-rate vibration packets and inspection frames.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>2</span>
                <div>
                  <strong style={{ color: '#34d399' }}>Dataflow & BigQuery</strong>: Apache Beam computes sliding-window FFT harmonics & persists millions of rows to the BigQuery analytical lakehouse.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>3</span>
                <div>
                  <strong style={{ color: '#c084fc' }}>Vision AI & Vertex AI</strong>: Automated optical inspection grades surface defects while LSTM / Boosted Tree models predict Remaining Useful Life (RUL).
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>4</span>
                <div>
                  <strong style={{ color: '#f472b6' }}>Gemini on Vertex AI</strong>: Multimodal reasoning correlates optical frames, sensor spectrograms, and OEM SOP manuals to deduce root cause.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>5</span>
                <div>
                  <strong style={{ color: '#34d399' }}>Cloud Run Actuation</strong>: Dispatches closed-loop feed rate throttling to shopfloor PLCs and issues automated SAP maintenance work orders.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code & GCP Implementation Inspector */}
        <div>
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title-area">
                <Code2 size={20} color="#a855f7" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="panel-title">{selectedNode.name}</h3>
                    {selectedNode.suggested && (
                      <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.65rem' }}>
                        Suggested GCP Tech
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Operational Role: <strong>{selectedNode.role}</strong>
                  </div>
                </div>
              </div>

              <button 
                className="btn-secondary"
                onClick={handleCopy}
                style={{ fontSize: '0.75rem' }}
              >
                {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1rem' }}>
              {selectedNode.description}
            </p>

            <div className="code-container" style={{ maxHeight: '430px', overflowY: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'inherit' }}>
                <code>{selectedNode.codeSnippet}</code>
              </pre>
            </div>

            {/* Architectural Highlights Checklist */}
            <div style={{ marginTop: '1.25rem', background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Suggested Google Cloud Technologies Operational Mapping:
              </div>
              <ul style={{ fontSize: '0.78rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li><strong>Gemini on Vertex AI:</strong> Reasoning and operational assistance via multimodal reasoning across telemetry, optical frames, and OEM manuals with tool execution.</li>
                <li><strong>Vertex AI:</strong> Predictive and machine-learning workloads for Remaining Useful Life (RUL) regression and anomaly risk scoring.</li>
                <li><strong>BigQuery:</strong> Sensor and operational data analysis storing multi-year telemetry with in-database BigQuery ML models.</li>
                <li><strong>Cloud Storage:</strong> Images, sensor data, and files archiving 4K camera frames, CAD files, and time-series parquet data.</li>
                <li><strong>Vision AI / Vertex AI Vision:</strong> Image/video analysis capabilities detecting micro-cracks and surface spalling at 120 FPS.</li>
                <li><strong>Pub/Sub:</strong> Streaming or event-driven data capturing 48,200 sensor messages/sec with zero ingestion loss.</li>
                <li><strong>Dataflow:</strong> Data pipelines calculating sliding-window FFT frequency harmonics with sub-18ms latency.</li>
                <li><strong>Cloud Run:</strong> Application and processing services running serverless containers for closed-loop PLC throttling and ERP integration.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

