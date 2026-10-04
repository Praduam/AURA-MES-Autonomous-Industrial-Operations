import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Wrench, 
  Sliders, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  CheckCircle2,
  HelpCircle,
  FileCode,
  Maximize2,
  Camera,
  Compass
} from 'lucide-react';

export default function CopilotView({ 
  messages, 
  onSendMessage, 
  onThrottleAsset, 
  onGenerateWorkOrder 
}) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copilotLightbox, setCopilotLightbox] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    onSendMessage(userText);
  };

  const handleChipClick = (promptText) => {
    onSendMessage(promptText);
  };

  return (
    <div>
      {/* GCP Copilot Reasoning & Operational Assistance Banner */}
      <div style={{
        background: 'rgba(236, 72, 153, 0.08)',
        border: '1px solid rgba(236, 72, 153, 0.25)',
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
          <span style={{ color: '#f472b6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} color="#f472b6" /> Gemini on Vertex AI:
          </span>
          <span style={{ color: '#cbd5e1' }}>
            <strong>Reasoning and operational assistance</strong> • Ingests sensor streams & 4K frames • Executes automated tool calls via <strong>Cloud Run</strong>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)', fontSize: '0.68rem' }}>
            ✨ Gemini on Vertex AI
          </span>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.68rem' }}>
            ⚡ Cloud Run Dispatcher
          </span>
        </div>
      </div>

      <div className="two-col-layout" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
        {/* Main Chat Interface */}
        <div className="glass-panel copilot-container">
          <div className="panel-header" style={{ paddingBottom: '0.85rem' }}>
            <div className="panel-title-area">
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div>
              <h2 className="panel-title" style={{ fontSize: '1rem' }}>
                Gemini 1.5 Pro Operational Copilot
              </h2>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Grounding: Real-Time OPC-UA Telemetry • ISO 10816 SOPs • Inspection Vision Embeddings
              </div>
            </div>
          </div>
          <span className="badge badge-gcp">Vertex AI GenAI</span>
        </div>

        {/* Message Stream */}
        <div className="copilot-messages">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'gemini'}`}
            >
              {msg.sender === 'gemini' && (
                <div className="gemini-badge">
                  <Sparkles size={13} /> Gemini 1.5 Pro • Reasoning Engine
                </div>
              )}

              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {msg.text}
              </div>

              {msg.suggestedActions && (
                <div className="action-chip-group">
                  {msg.suggestedActions.map((action, idx) => (
                    <button 
                      key={idx} 
                      className="action-chip"
                      onClick={() => handleChipClick(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble gemini">
              <div className="gemini-badge">
                <Sparkles size={13} /> Gemini Reasoning In Progress...
              </div>
              <div style={{ display: 'flex', gap: '4px', padding: '6px 0' }}>
                <span className="live-dot" />
                <span className="live-dot" style={{ animationDelay: '0.2s' }} />
                <span className="live-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: '0.6rem 0', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          <button 
            className="action-chip" 
            onClick={() => handleChipClick('Explain the BPFO vibration peak on CNC-04 and calculate failure risk')}
          >
            🔍 Explain BPFO Vibration Spike
          </button>
          <button 
            className="action-chip" 
            onClick={() => handleChipClick('Generate step-by-step SOP work instructions for CNC-04 spindle bearing replacement')}
          >
            📋 Generate Spindle SOP Checklist
          </button>
          <button 
            className="action-chip" 
            onClick={() => handleChipClick('Simulate energy & carbon reduction if we shift heavy stamping to off-peak hours')}
          >
            ⚡ Simulate Carbon Peak Shifting
          </button>
          <button 
            className="action-chip" 
            onClick={() => handleChipClick('Why did the SMT line produce a solder bridge on PCB-4102?')}
          >
            🔬 SMT Solder Bridge RCA
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="copilot-input-area">
          <input
            type="text"
            className="copilot-input"
            placeholder="Ask Gemini to diagnose machines, generate SOPs, calculate RUL, or adjust PLC setpoints..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 1.25rem' }}>
            <Send size={16} /> Send
          </button>
        </form>
      </div>

      {/* Right Column: Grounding Context & Active Plant Knowledge Base */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Knowledge & Retrieval Augmented Generation (RAG) Grounding */}
        <div className="glass-panel">
          <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              Vertex AI Grounding Context (RAG)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Active Vector Index</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
              <div style={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FileText size={13} color="#10b981" /> ISO 10816-3 Vibration Standards
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>
                Mechanical vibration evaluation by measurements on non-rotating parts (Class II industrial machines).
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
              <div style={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FileText size={13} color="#06b6d4" /> CNC-04 OEM Service Manual v4.2
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>
                Spindle ceramic hybrid bearings 7014-C-T-P4S. Preload: 420N. Grease type: Klüber NBU 15.
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #8b5cf6' }}>
              <div style={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FileText size={13} color="#8b5cf6" /> IPC-A-610 Class 3 Electronic Assemblies
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>
                Acceptability of solder bridges, minimum clearance 0.15mm, zero short-circuit tolerance.
              </div>
            </div>
          </div>
        </div>

        {/* Engineering CAD Blueprint & Diagnostic Schematic Reference */}
        <div className="glass-panel">
          <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCode size={14} color="#00e5ff" /> Technical CAD Blueprint
            </span>
            <span style={{ fontSize: '0.7rem', color: '#d4af37' }}>ISO 2768-m / P4</span>
          </div>

          <div 
            style={{ 
              position: 'relative', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              cursor: 'pointer',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              background: '#040b17'
            }}
            onClick={() => setCopilotLightbox({
              title: 'CNC-04 Spindle Bearing — Precision Angular Contact CAD Blueprint',
              src: '/assets/cad/cad_bearing_schematic.jpg'
            })}
          >
            <img 
              src="/assets/cad/cad_bearing_schematic.jpg" 
              alt="Engineering CAD Blueprint of Ceramic Hybrid Bearing" 
              style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', filter: 'brightness(0.95)' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(180deg, transparent, rgba(4, 11, 23, 0.95))',
              padding: '6px 8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.68rem'
            }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>DWG: AC-B-7009-X1</span>
              <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Maximize2 size={10} /> Enlarge Blueprint
              </span>
            </div>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
            Grounding vector referenced by Gemini when formulating the CNC-04 spindle replacement SOP.
          </div>
        </div>

        {/* Autonomous Action Capabilities */}
        <div className="glass-panel">
          <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
              Gemini Tool-Calling & Function Capabilities
            </span>
          </div>

          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#34d399" />
              <span><code>throttle_feed_rate(machine_id, pct)</code></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#34d399" />
              <span><code>dispatch_sap_work_order(asset_id, priority)</code></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#34d399" />
              <span><code>trigger_optical_quarantine(batch_id)</code></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#34d399" />
              <span><code>optimize_peak_energy_schedule()</code></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Copilot Lightbox Modal */}
    {copilotLightbox && (
      <div className="classic-lightbox-overlay" onClick={() => setCopilotLightbox(null)}>
        <div className="classic-lightbox-content" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#00e5ff" />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                {copilotLightbox.title}
              </span>
            </div>
            <button className="btn-close" onClick={() => setCopilotLightbox(null)}>✕</button>
          </div>
          <div className="lightbox-image-box">
            <img 
              src={copilotLightbox.src} 
              alt={copilotLightbox.title} 
              style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
          <div className="lightbox-footer">
            <span>High-Resolution Engineering Asset &bull; Grounded in Gemini Operational RAG</span>
            <span style={{ color: '#d4af37' }}>DIN ISO 2768-m / ABEC 7 (P4) Aerospace Tolerance</span>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
