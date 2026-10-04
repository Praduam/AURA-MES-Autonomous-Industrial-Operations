import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Zap, 
  Camera, 
  Activity, 
  TrendingUp, 
  Cloud, 
  RotateCcw, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Minimize2,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function FloatingChatbot({
  assets,
  samples,
  criticalCount,
  activeTab,
  setActiveTab,
  onThrottleAsset,
  onGenerateWorkOrder,
  onResetNominal,
  onSimulateAnomaly
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadAlert, setHasUnreadAlert] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      time: 'Just now',
      text: `Hello Operator! I am **AURA Support Assistant**, powered by **Gemini on Vertex AI**. 

Whenever you encounter a machine issue, optical defect, or operational question across the plant, ask me directly here. 

How can I help you troubleshoot right now?`,
      actions: [
        { label: '🚨 Check Active Plant Alarms', prompt: 'What are the current active alarms or issues in the plant?' },
        { label: '🛠️ Spindle Bearing SOP', prompt: 'How do I replace the spindle bearing on CNC-04 according to SOP?' },
        { label: '⚡ How to Throttle Feed Rate', prompt: 'How do I execute a closed-loop spindle throttle to extend RUL?' },
        { label: '🔍 Explain Optical Inspection Defect', prompt: 'Why did the latest optical inspection sample fail?' }
      ]
    }
  ]);

  // Alert trigger if an anomaly occurs
  const prevCriticalCount = useRef(criticalCount);
  useEffect(() => {
    if (criticalCount > prevCriticalCount.current) {
      setHasUnreadAlert(true);
      const criticalAsset = assets.find(a => a.status === 'critical') || assets[0];
      
      const anomalyAlertMsg = {
        id: Date.now(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `⚠️ **URGENT ISSUE DETECTED ON SHOPFLOOR**:
- **Asset**: [${criticalAsset.id}] ${criticalAsset.name}
- **Vibration Peak**: ${criticalAsset.metrics?.vibration?.value} mm/s RMS (Threshold: ${criticalAsset.metrics?.vibration?.normalMax} mm/s)
- **Temperature**: ${criticalAsset.metrics?.temperature?.value}°C
- **Predicted Failure**: ${criticalAsset.failureMode || 'Outer-Race Harmonic Degradation'}
- **Estimated RUL**: ${criticalAsset.rulHours} Hours remaining

**Recommended Immediate Containment**:
1. Throttle spindle feed rate to 75% via Cloud Run PLC override.
2. Dispatch Bay 3 Reliability Technician.
3. Generate emergency SAP/Maximo work order.`,
        actions: [
          { label: '⚡ Throttle Spindle Now (Cloud Run)', type: 'throttle', assetId: criticalAsset.id },
          { label: '📋 Generate Emergency Work Order', type: 'workorder', assetId: criticalAsset.id },
          { label: '📊 View CNC-04 Telemetry Spectrum', type: 'navigate', targetTab: 'maintenance' }
        ]
      };

      setMessages(prev => [...prev, anomalyAlertMsg]);
    }
    prevCriticalCount.current = criticalCount;
  }, [criticalCount, assets]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasUnreadAlert(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnreadAlert(false);
  };

  const handleActionClick = (action) => {
    if (action.prompt) {
      handleUserSubmit(action.prompt);
    } else if (action.type === 'throttle') {
      onThrottleAsset(action.assetId || 'CNC-04');
      const confirmMsg = {
        id: Date.now(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `✅ **ACTION EXECUTED**: Closed-loop spindle feed-rate override dispatched to **${action.assetId || 'CNC-04'}** via **Cloud Run**. Spindle vibration dropped by ~35% and Remaining Useful Life (RUL) extended by +65 hours.`,
        actions: [
          { label: '📋 Generate SAP Work Order', type: 'workorder', assetId: action.assetId || 'CNC-04' },
          { label: '📊 Go to Predictive Maintenance View', type: 'navigate', targetTab: 'maintenance' }
        ]
      };
      setMessages(prev => [...prev, confirmMsg]);
    } else if (action.type === 'workorder') {
      onGenerateWorkOrder(action.assetId || 'CNC-04');
      const confirmMsg = {
        id: Date.now(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `✅ **SAP / MAXIMO WORK ORDER GENERATED**: Priority work order dispatched to **Mechanical Reliability Bay 3**. Parts requested: *7014-C-T-P4S Ceramic Hybrid Bearing* & *Klüber NBU 15 grease*. Cloud Run webhook confirmed ERP ingestion.`,
        actions: [
          { label: '🛠️ Review Bearing Replacement SOP', prompt: 'Show me the step-by-step bearing replacement SOP.' },
          { label: '📊 View Fleet Dashboard', type: 'navigate', targetTab: 'maintenance' }
        ]
      };
      setMessages(prev => [...prev, confirmMsg]);
    } else if (action.type === 'navigate') {
      setActiveTab(action.targetTab);
    }
  };

  const handleUserSubmit = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Contextual intelligent problem solving reply
    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();
      let botResponse = '';
      let suggestedActions = [];

      if (lower.includes('alarm') || lower.includes('issue') || lower.includes('wrong') || lower.includes('critical') || lower.includes('status')) {
        const crit = assets.find(a => a.status === 'critical');
        if (crit) {
          botResponse = `### 🚨 Active Issue: ${crit.name} (${crit.id})
- **Current Vibration**: **${crit.metrics.vibration.value} mm/s RMS** (Nominal limit is ${crit.metrics.vibration.normalMax} mm/s).
- **Physical Root Cause**: Outer raceway flaking & micro-spalling detected via Dataflow FFT frequency band at **BPFO (~214 Hz)**.
- **Urgency**: Remaining Useful Life is down to **${crit.rulHours} hours**.
- **Prescribed Solution**:
  1. Immediately throttle feed rate to 75% to alleviate Hertzian stress.
  2. Issue SAP work order for shift handover bearing replacement.`;
          suggestedActions = [
            { label: '⚡ Throttle Spindle Now (Cloud Run)', type: 'throttle', assetId: crit.id },
            { label: '📋 Generate SAP Work Order', type: 'workorder', assetId: crit.id },
            { label: '📊 Inspect Vibration Telemetry', type: 'navigate', targetTab: 'maintenance' }
          ];
        } else {
          botResponse = `### ✅ All Plant Fleet Systems Nominal
All 4 monitored industrial production nodes are currently operating within nominal ISO 10816 standards:
- **CNC-04**: Healthy (Vibration 1.42 mm/s, RUL 840h)
- **Robotic Arm Cell #02**: Optimal (Bearing temp 41.2°C)
- **Thermal Stamping Press**: Optimal (Cycle pressure 210 bar)
- **High-Speed Spindle #07**: Optimal (0.95 mm/s RMS)

If you would like to test our anomaly response, you can inject a simulated bearing failure.`;
          suggestedActions = [
            { label: '⚠️ Simulate CNC-04 Bearing Spike', prompt: 'Simulate an anomaly on CNC-04 to test response.' },
            { label: '🔍 Check Optical Inspection Scans', type: 'navigate', targetTab: 'vision' }
          ];
        }
      } else if (lower.includes('sop') || lower.includes('replace') || lower.includes('bearing') || lower.includes('spindle') || lower.includes('manual')) {
        botResponse = `### 📋 Standard Operating Procedure (SOP): CNC Spindle Bearing Replacement
**Reference**: OEM Service Manual §4.8 | Class: Mechanical Reliability

**Required Tools & Consumables**:
- Ceramic Hybrid Bearing Kit (*7014-C-T-P4S*)
- Induction Bearing Heater & Dial Runout Indicator (< 2 µm)
- Syringe Dispenser with *Klüber Isoflex NBU 15* grease
- Calibrated Torque Wrench (Set to 420 N·m)

**Execution Steps**:
1. **LOTO Safety**: Lockout/Tagout on electrical cabinet 4B and pneumatic supply.
2. **Disassembly**: Remove coolant shroud and uncouple HSK-A63 tool clamping cylinder.
3. **Thermal Expansion**: Heat outer bearing housing to **80°C** with induction heater (Do not use open flame).
4. **Extraction & Inspection**: Extract worn bearing; verify spindle shaft runout (< 2 µm Total Indicated Runout).
5. **Grease Packing**: Apply 3.2 ml of Klüber NBU 15 grease evenly across raceways.
6. **Torque Preload**: Torque preload locknut to **420 N·m**.
7. **Spin-In Test**: Conduct 20-minute stepped spin-in runout test from 2,000 to 12,000 RPM.`;
        suggestedActions = [
          { label: '📋 Create SAP Work Order for Bay 3', type: 'workorder', assetId: 'CNC-04' },
          { label: '⚡ Throttle Spindle Until Replacement', type: 'throttle', assetId: 'CNC-04' }
        ];
      } else if (lower.includes('throttle') || lower.includes('feed rate') || lower.includes('speed') || lower.includes('slow down')) {
        botResponse = `### ⚡ Closed-Loop Spindle Throttle (Cloud Run PLC Actuation)
When bearing vibration spikes or acoustic emission exceeds 85 dB, throttling spindle feed rate to **75%** reduces cutting tool forces by 42%.

**How it works**:
1. Gemini issues an autonomous tool call ` + '`throttle_feed_rate(asset_id, pct)`' + `.
2. Google Cloud Run executes an Eventarc webhook.
3. The command is bridged to the machine PLC over **OPC-UA/Modbus** within 12 milliseconds.
4. Telemetry confirms vibration stabilization directly to Firestore for operator screen sync.`;
        suggestedActions = [
          { label: '⚡ Execute Spindle Throttle Now', type: 'throttle', assetId: 'CNC-04' },
          { label: '📊 View Predictive Maintenance Dashboard', type: 'navigate', targetTab: 'maintenance' }
        ];
      } else if (lower.includes('scan') || lower.includes('vision') || lower.includes('optical') || lower.includes('defect') || lower.includes('crack') || lower.includes('spall')) {
        const sample = samples[0];
        botResponse = `### 🔍 Visual Quality Control Analysis: ${sample.partName} (${sample.partNumber})
- **Scan Status**: **${sample.status.toUpperCase()}** (${sample.defects.length} Defect Regions Localized).
- **Vision AI Metrology**: ${sample.defects.map(d => `${d.label} measured at ${d.measuredSize} (Tolerance limit: ${d.toleranceLimit})`).join(', ')}.
- **Gemini Multimodal RCA**: ${sample.geminiRCA.headline}.
- **Corrective Action**: ${sample.geminiRCA.recommendedCorrectiveAction}.`;
        suggestedActions = [
          { label: '👁️ Open Optical Inspection Scanner', type: 'navigate', targetTab: 'vision' },
          { label: '🛡️ Quarantine Production Batch', prompt: 'Quarantine this production batch in ERP/MES.' }
        ];
      } else if (lower.includes('simulate') || lower.includes('inject')) {
        onSimulateAnomaly();
        botResponse = `⚠️ **Anomaly Simulation Triggered!**
CNC-04 has been injected with a high vibration spike (6.85 mm/s RMS at BPFO frequency). The predictive maintenance model has updated RUL to 12 hours.`;
        suggestedActions = [
          { label: '⚡ Throttle Spindle to Alleviate Stress', type: 'throttle', assetId: 'CNC-04' },
          { label: '📋 Generate Emergency Work Order', type: 'workorder', assetId: 'CNC-04' },
          { label: '📊 Jump to Predictive Maintenance', type: 'navigate', targetTab: 'maintenance' }
        ];
      } else if (lower.includes('reset') || lower.includes('nominal')) {
        onResetNominal();
        botResponse = `✅ **Fleet Reset**: All factory machines have been restored to nominal operating profiles.`;
        suggestedActions = [
          { label: '📊 View Fleet Health', type: 'navigate', targetTab: 'maintenance' }
        ];
      } else if (lower.includes('gcp') || lower.includes('google cloud') || lower.includes('cloud') || lower.includes('architecture')) {
        botResponse = `### ☁️ Suggested Google Cloud Technologies Powering AURA-MES:
1. **Gemini on Vertex AI**: Reasoning and operational assistance (multimodal RCA & tool execution).
2. **Vertex AI**: Predictive and machine-learning workloads (RUL regression & anomaly detection).
3. **BigQuery**: Sensor and operational data analysis (petabyte-scale telemetry lakehouse).
4. **Cloud Storage**: Images, sensor data, and files (4K inspection frames & parquet archives).
5. **Vision AI**: Image/video analysis capabilities (120 FPS high-speed defect metrology).
6. **Pub/Sub**: Streaming or event-driven data (48,200 msg/sec ingestion).
7. **Dataflow**: Data pipelines (sliding-window FFT harmonic feature extraction).
8. **Cloud Run**: Application and processing services (closed-loop PLC overrides & APIs).`;
        suggestedActions = [
          { label: '🌐 Open Interactive GCP Architecture', type: 'navigate', targetTab: 'architecture' }
        ];
      } else if (lower.includes('energy') || lower.includes('carbon') || lower.includes('oee') || lower.includes('sustainability')) {
        botResponse = `### 🌿 Energy Optimization & Decarbonization
- **Current OEE**: **83.8%** (Availability 94.2%, Performance 89.6%, Quality 99.2%).
- **Peak Grid Shifting**: Vertex AI dynamically reschedules heavy thermal stamping and 68MW turbine cycles from peak tariff periods (14:00-18:00, $0.24/kWh) to solar abundance hours ($0.08/kWh).
- **Impact**: **$20,400 monthly electricity savings** and **18.6 Metric Tons CO₂ avoided** per month.`;
        suggestedActions = [
          { label: '📈 View OEE & Sustainability View', type: 'navigate', targetTab: 'sustainability' }
        ];
      } else {
        botResponse = `### 🤖 AURA Diagnostic Assistant
I have checked the current factory telemetry streams and operational state for your inquiry:

1. **Telemetry Status**: Monitored across Pub/Sub stream and BigQuery telemetry lake.
2. **Diagnostic Guidance**: If you are troubleshooting an equipment fault, check for vibration harmonic peaks at BPFO or motor stator temperature.
3. **Operational Assistance**: You can execute machine feed throttling, create automated work orders, or jump directly to the relevant dashboard view.

What specific machine or inspection issue would you like to investigate?`;
        suggestedActions = [
          { label: '🚨 Check CNC-04 Vibration Issue', prompt: 'What is the vibration status of CNC-04?' },
          { label: '🛠️ Spindle Bearing SOP', prompt: 'Show me the spindle bearing replacement SOP.' },
          { label: '📸 Optical Inspection Defect', type: 'navigate', targetTab: 'vision' }
        ];
      }

      const botReplyMsg = {
        id: Date.now(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse,
        actions: suggestedActions
      };

      setMessages(prev => [...prev, botReplyMsg]);
    }, 600);
  };

  const activeCritical = assets.find(a => a.status === 'critical');

  return (
    <>
      {/* Floating Chatbot Launch Trigger Button (Bottom Right) */}
      {!isOpen && (
        <div className="floating-chatbot-container">
          <button 
            className={`floating-chatbot-trigger ${criticalCount > 0 ? 'has-issue' : ''}`}
            onClick={handleOpen}
            title="Have an operational issue or question? Click to ask AI Support"
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Bot size={20} />
              {criticalCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #060913'
                }}>
                  {criticalCount}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>
                {criticalCount > 0 ? '🚨 Machine Alarm Active' : 'Have an Issue? Ask AI'}
              </span>
              <span style={{ fontSize: '0.68rem', opacity: 0.85, fontWeight: 500 }}>
                {criticalCount > 0 ? 'Tap to troubleshoot CNC-04' : 'Gemini Operational Copilot'}
              </span>
            </div>

            <Sparkles size={14} color="#f472b6" />
          </button>
        </div>
      )}

      {/* Expanded Floating Chatbot Modal Window */}
      {isOpen && (
        <div className="floating-chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)'
              }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    AURA Plant Support Copilot
                  </h3>
                  <span style={{
                    fontSize: '0.62rem',
                    background: 'rgba(52, 211, 153, 0.2)',
                    color: '#34d399',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    ● ONLINE
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  Gemini on Vertex AI • Real-Time Issue Resolution
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setMessages([messages[0]])}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Clear conversation history"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Minimize chatbot"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Plant Context Status Bar */}
          <div className="chatbot-context-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {activeCritical ? (
                <>
                  <AlertTriangle size={13} color="#f87171" />
                  <span style={{ color: '#fca5a5', fontWeight: 600 }}>
                    Alarm: [{activeCritical.id}] Vib {activeCritical.metrics.vibration.value} mm/s • RUL {activeCritical.rulHours}h
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={13} color="#34d399" />
                  <span style={{ color: '#86efac', fontWeight: 600 }}>
                    Plant Status: All 4 fleet nodes nominal
                  </span>
                </>
              )}
            </div>
            <span style={{ color: '#64748b', fontSize: '0.68rem', textTransform: 'capitalize' }}>
              Tab: {activeTab}
            </span>
          </div>

          {/* Quick Issue / Troubleshooting Chips */}
          <div className="chatbot-quick-chips">
            {activeCritical && (
              <button 
                className="chatbot-chip"
                style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#fca5a5' }}
                onClick={() => handleUserSubmit('Why is CNC-04 in critical status and how do I fix it?')}
              >
                🚨 Fix CNC-04 Vibration Spike
              </button>
            )}
            <button 
              className="chatbot-chip"
              onClick={() => handleUserSubmit('Show me the bearing replacement SOP checklist.')}
            >
              🛠️ Spindle Bearing SOP
            </button>
            <button 
              className="chatbot-chip"
              onClick={() => handleUserSubmit('How do I throttle machine feed rate to 75%?')}
            >
              ⚡ Throttle Feed Rate
            </button>
            <button 
              className="chatbot-chip"
              onClick={() => handleUserSubmit('Explain the optical inspection defect on SCAN-BRG-9021.')}
            >
              🔍 Optical Defect Analysis
            </button>
            <button 
              className="chatbot-chip"
              onClick={() => handleUserSubmit('How do I generate an emergency SAP or Maximo work order?')}
            >
              📋 Generate Work Order
            </button>
            <button 
              className="chatbot-chip"
              onClick={() => handleUserSubmit('What Google Cloud technologies are implemented here?')}
            >
              ☁️ Google Cloud Stack
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="chatbot-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={`chatbot-bubble ${msg.sender === 'user' ? 'user' : 'assistant'}`}>
                  {/* Sender Header */}
                  <div style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    marginBottom: '4px',
                    color: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#38bdf8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{msg.sender === 'user' ? 'Operator' : 'Gemini Support Copilot'}</span>
                    <span style={{ fontSize: '0.62rem', color: '#94a3b8' }}>{msg.time}</span>
                  </div>

                  {/* Text Content */}
                  <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', lineHeight: 1.55 }}>
                    {msg.text.split('\n').map((line, idx) => {
                      if (line.startsWith('### ')) {
                        return <h4 key={idx} style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff', margin: '6px 0 3px' }}>{line.replace('### ', '')}</h4>;
                      }
                      if (line.startsWith('- **') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ') || line.startsWith('7. ')) {
                        return <div key={idx} style={{ marginTop: '2px', color: '#e2e8f0' }}>{line}</div>;
                      }
                      return <p key={idx} style={{ margin: '3px 0' }}>{line}</p>;
                    })}
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Suggested Action:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {msg.actions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(action)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: action.type === 'throttle' 
                                ? '1px solid #10b981' 
                                : action.type === 'workorder'
                                  ? '1px solid #8b5cf6'
                                  : '1px solid rgba(56, 189, 248, 0.4)',
                              background: action.type === 'throttle'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : action.type === 'workorder'
                                  ? 'rgba(139, 92, 246, 0.15)'
                                  : 'rgba(6, 182, 212, 0.15)',
                              color: action.type === 'throttle' ? '#34d399' : action.type === 'workorder' ? '#c084fc' : '#38bdf8',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s'
                            }}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-bubble assistant" style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                <Bot size={14} color="#38bdf8" />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Gemini is reasoning on plant telemetry...</span>
                <span style={{ display: 'inline-flex', gap: '3px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#38bdf8', animation: 'pulse-green 1s infinite' }} />
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8b5cf6', animation: 'pulse-green 1s infinite 0.2s' }} />
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00f2fe', animation: 'pulse-green 1s infinite 0.4s' }} />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form 
            className="chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Ask an operational question or describe an issue..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '8px',
                padding: '9px 12px',
                color: '#fff',
                fontSize: '0.8rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              style={{
                background: inputText.trim() 
                  ? 'linear-gradient(135deg, #0284c7, #8b5cf6)' 
                  : 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 14px',
                color: inputText.trim() ? '#fff' : '#64748b',
                cursor: inputText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 700,
                fontSize: '0.78rem',
                transition: 'all 0.2s'
              }}
            >
              <Send size={14} /> Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
