import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FacilityHeroBanner from './components/FacilityHeroBanner';
import MetricCards from './components/MetricCards';
import PredictiveMaintenanceView from './components/PredictiveMaintenanceView';
import VisualInspectionView from './components/VisualInspectionView';
import CopilotView from './components/CopilotView';
import SustainabilityView from './components/SustainabilityView';
import CloudArchitectureView from './components/CloudArchitectureView';
import FloatingChatbot from './components/FloatingChatbot';

import { 
  INITIAL_ASSETS, 
  INSPECTION_SAMPLES, 
  FACTORY_METRICS, 
  GCP_ARCHITECTURE_STACK, 
  INITIAL_COPILOT_MESSAGES 
} from './data/mockFactoryData';

export default function App() {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [samples, setSamples] = useState(INSPECTION_SAMPLES);
  const [selectedAssetId, setSelectedAssetId] = useState('CNC-04');
  const [selectedSampleId, setSelectedSampleId] = useState('SCAN-BRG-9021');
  const [isAutonomousActive, setIsAutonomousActive] = useState(true);
  const [copilotMessages, setCopilotMessages] = useState(INITIAL_COPILOT_MESSAGES);
  const [metrics, setMetrics] = useState(FACTORY_METRICS);

  // Real-time simulated telemetry tick
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Slight natural jitter to make dashboard feel alive
          const jitter = (Math.random() - 0.49) * 0.08;
          const tempJitter = (Math.random() - 0.49) * 0.3;

          const currentVib = Math.max(0.8, Number((asset.metrics.vibration.value + jitter).toFixed(2)));
          const currentTemp = Math.max(25, Number((asset.metrics.temperature.value + tempJitter).toFixed(1)));

          const updatedVibHist = [...asset.metrics.vibration.history.slice(1), currentVib];
          const updatedTempHist = [...asset.metrics.temperature.history.slice(1), currentTemp];

          return {
            ...asset,
            metrics: {
              ...asset.metrics,
              vibration: {
                ...asset.metrics.vibration,
                value: currentVib,
                history: updatedVibHist
              },
              temperature: {
                ...asset.metrics.temperature,
                value: currentTemp,
                history: updatedTempHist
              }
            }
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Simulate an anomalous bearing vibration spike on CNC-04
  const handleSimulateAnomaly = () => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id === 'CNC-04') {
          return {
            ...asset,
            status: 'critical',
            healthScore: 38,
            rulHours: 12,
            failureMode: 'Accelerating Bearing Outer-Race Flaking & Spalling',
            recommendedAction: 'URGENT: Emergency Feed Rate Override to 60% and Immediate Technician Inspection Required',
            metrics: {
              ...asset.metrics,
              vibration: {
                ...asset.metrics.vibration,
                value: 6.85,
                status: 'critical',
                history: [2.7, 3.4, 4.1, 4.8, 5.7, 6.85]
              },
              temperature: {
                ...asset.metrics.temperature,
                value: 86.2,
                status: 'critical',
                history: [64, 69, 74, 78, 82, 86.2]
              },
              acousticEmission: {
                ...asset.metrics.acousticEmission,
                value: 94.8,
                status: 'critical'
              }
            },
            spectrumFrequencies: [
              { freq: '1X (RPM)', amp: 1.1 },
              { freq: '2X (Harmonic)', amp: 2.4 },
              { freq: 'BPFO (Outer Race)', amp: 6.85 }, // Major critical spike!
              { freq: 'BPFI (Inner Race)', amp: 1.8 },
              { freq: 'BSF (Ball Spin)', amp: 0.9 }
            ]
          };
        }
        return asset;
      })
    );

    // Add alert into Gemini Copilot
    const alertMsg = {
      id: Date.now(),
      sender: 'gemini',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `🚨 **ANOMALY DETECTED BY GOOGLE CLOUD DATAFLOW**: 
Asset **[CNC-04] 5-Axis CNC Milling Center** vibration spiked to **6.85 mm/s RMS** (Threshold: 2.80 mm/s). Spindle temperature reached **86.2°C**.
Remaining Useful Life (RUL) reduced sharply to **12 Hours**.

Predicted Failure Mode: **Outer-Race Bearing Flaking & Spalling**.
Recommended action: Immediate Feed Override or spindle halt to avoid catastrophic tool crash.`,
      suggestedActions: [
        'Execute Emergency Feed Override to 60%',
        'Dispatch Bay 3 Reliability Technician',
        'Generate Emergency SAP Work Order #WO-EMERGENCY'
      ]
    };

    setCopilotMessages(prev => [...prev, alertMsg]);
    setSelectedAssetId('CNC-04');
  };

  // Reset fleet back to nominal pristine state
  const handleResetNominal = () => {
    setAssets(INITIAL_ASSETS);
  };

  // Throttle asset feed rate to reduce stress and extend RUL
  const handleThrottleAsset = (assetId) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id === assetId) {
          const newVib = Number((asset.metrics.vibration.value * 0.65).toFixed(2));
          const newTemp = Number((asset.metrics.temperature.value * 0.88).toFixed(1));
          const newRul = asset.rulHours + 65;

          return {
            ...asset,
            status: newVib > asset.metrics.vibration.normalMax ? 'warning' : 'healthy',
            healthScore: Math.min(95, asset.healthScore + 20),
            rulHours: newRul,
            metrics: {
              ...asset.metrics,
              vibration: {
                ...asset.metrics.vibration,
                value: newVib,
                status: newVib > asset.metrics.vibration.normalMax ? 'warning' : 'healthy',
                history: [...asset.metrics.vibration.history.slice(1), newVib]
              },
              temperature: {
                ...asset.metrics.temperature,
                value: newTemp,
                status: 'healthy',
                history: [...asset.metrics.temperature.history.slice(1), newTemp]
              }
            }
          };
        }
        return asset;
      })
    );
  };

  // Generate automated maintenance work order
  const handleGenerateWorkOrder = (assetId) => {
    const targetAsset = assets.find(a => a.id === assetId) || assets[0];
    const newWoId = `WO-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const woMsg = {
      id: Date.now(),
      sender: 'gemini',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `✅ **SAP / MAXIMO WORK ORDER CREATED**: **#${newWoId}**
- **Asset**: [${targetAsset.id}] ${targetAsset.name}
- **Component**: ${targetAsset.criticalComponent}
- **Priority**: ${targetAsset.status === 'critical' ? 'P1 - EMERGENCY' : 'P2 - URGENT'}
- **Assigned Team**: Mechanical Reliability Crew (Bay 3)
- **Required Parts**: Bearing Kit (7014-C-T-P4S Ceramic Hybrid), Klüber NBU 15 grease, O-ring seal pack.
- **Estimated Downtime**: 45 minutes during shift handover.

Cloud Run webhook confirmed delivery to ERP Gateway.`,
      suggestedActions: [
        'View Work Order Details',
        'Check Spare Parts Inventory in SAP',
        'Review Mechanical SOP Checklist'
      ]
    };

    setCopilotMessages(prev => [...prev, woMsg]);
  };

  // Handle Copilot user prompt
  const handleSendMessage = (userText) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText
    };

    setCopilotMessages(prev => [...prev, userMsg]);

    // Generate intelligent contextual response
    setTimeout(() => {
      let botReply = '';
      let actions = [];

      const lower = userText.toLowerCase();

      if (lower.includes('bpfo') || lower.includes('vibration') || lower.includes('cnc-04')) {
        botReply = `### Diagnostic Report: CNC-04 High Vibration & BPFO Harmonic Peak

1. **Signal Analysis (Dataflow FFT)**: 
   The Fast Fourier Transform identifies a dominant peak at **4.82 mm/s RMS** specifically at **BPFO (Ball Pass Frequency Outer Race)** (~214 Hz). Normal baseline for this ceramic hybrid bearing is 0.8 mm/s.

2. **Physical Degradation Mechanism**:
   Hertzian contact fatigue has caused micro-spalling on the stationary outer race. This matches ISO 10816-3 Severity Zone C (Unrestricted long-term operation causes damage).

3. **Remaining Useful Life (RUL)**:
   Vertex AI Boosted Tree Regressor predicts **42 hours** remaining before spall progression breaches vibration trip limit (7.1 mm/s).

4. **Prescribed Intervention**:
   - Throttle spindle feed rate to 75% immediately via Cloud Run PLC integration.
   - Schedule bearing replacement for shift handover at 18:00 UTC (Estimated downtime: 45 min vs 16 hours catastrophic crash downtime).`;
        actions = ['Execute Spindle Throttle to 75%', 'Generate Work Order for Bay 3 Handover', 'View ISO 10816 Standards'];
      } else if (lower.includes('sop') || lower.includes('spindle bearing') || lower.includes('checklist')) {
        botReply = `### Standard Operating Procedure (SOP): CNC Spindle Bearing Replacement
**Reference**: OEM Service Manual §4.8 | Class: Mechanical Reliability

**Pre-Requisites**:
1. Lockout/Tagout (LOTO) on Electrical Cabinet 4B & Pneumatic Main.
2. Prepare Bearing Set: *7014-C-T-P4S Angular Contact Ceramic Hybrid* (Lot verified in SAP).

**Step-by-Step Execution**:
1. Remove spindle nose coolant shroud and uncouple HSK-A63 tool clamping cylinder.
2. Heat outer housing to 80°C with induction heater (Do not use open flame or exceed 100°C).
3. Extract worn bearing assembly; inspect spindle shaft runout with dial indicator (< 2 µm TIR).
4. Apply 3.2 ml of Klüber Isoflex NBU 15 grease evenly across raceways using syringe dispenser.
5. Torque preload locking nut to **420 N·m** using calibrated torque wrench #TW-04.
6. Conduct 20-minute stepped spin-in runout test from 2,000 to 12,000 RPM while logging Dataflow telemetry.`;
        actions = ['Print SOP Checklist (PDF)', 'Verify Klüber NBU 15 Inventory', 'Confirm LOTO Safety Clearance'];
      } else if (lower.includes('carbon') || lower.includes('energy') || lower.includes('shift') || lower.includes('peak')) {
        botReply = `### Decarbonization & Grid Shifting Simulation (Vertex AI)

- **Current Energy Intensity**: 14.2 kWh / finished aerospace component.
- **Dynamic Peak Shifting Result**: By shifting heavy 68MW turbine testing and stamping cycles from peak grid tariff hours (14:00 - 18:00, $0.24/kWh) to solar abundance windows (10:00 - 13:00, $0.08/kWh):
  - **Monthly Cost Reduction**: **$20,400 / month (-24.2%)**.
  - **Scope 2 Carbon Avoidance**: **18.6 Metric Tons CO₂ / month** (Grid emission factor: 0.38 kg CO₂/kWh).
  - **Factory OEE Impact**: Zero throughput penalty; production buffers absorb shifting intervals effortlessly.`;
        actions = ['Apply Vertex AI Dynamic Energy Schedule', 'Download Decarbonization Audit Report'];
      } else if (lower.includes('pcb') || lower.includes('solder') || lower.includes('bridge') || lower.includes('smt')) {
        botReply = `### Root Cause Analysis: SMT Solder Bridge Short on PCB-4102

- **Detection**: Automated Optical Inspection (AOI) identified a 0.62 mm conductive bridge bridging pins 14-16 on IC-03 (STM32 QFP package). Confidence: 99.2%.
- **Root Cause**: Stencil aperture smear caused by excessive squeegee pressure (8.2 kg vs nominal 6.8 kg) combined with delayed solvent wipe cycle (>15 cycles).
- **Corrective Line Adjustments**:
  1. Automated trigger sent via Cloud Run to clean stencil wiper immediately.
  2. Squeegee pressure setpoint corrected to 6.8 kg on Line 4 SMT printer.
  3. PCB-4102 routed to rework desoldering station automatically.`;
        actions = ['Quarantine Batch SMT-BATCH-8812', 'Trigger Automated Stencil Cleaning', 'Verify SMT Printer Calibration'];
      } else {
        botReply = `I have analyzed your query against the live plant data lake:
- **Telemetry Health**: 4 monitored machine assets active. 1 asset requires maintenance planning (CNC-04).
- **Vision Quality**: Optical scanner processed 140 parts this shift with 99.2% quality rate.
- **Sustainability**: Decarbonization optimizer is currently saving 18.6 Metric Tons of CO₂ this month.

Would you like me to execute an operational adjustment, simulate machine parameters, or generate a maintenance work order?`;
        actions = ['Simulate Machine Throttle to 75%', 'Generate Automated Maximo Work Order', 'Explain BPFO Vibration Spike'];
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'gemini',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botReply,
        suggestedActions: actions
      };

      setCopilotMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  // When a user clicks "Consult Gemini Copilot" from another tab
  const handleAskCopilot = (promptText) => {
    setActiveTab('copilot');
    handleSendMessage(promptText);
  };

  const criticalCount = assets.filter(a => a.status === 'critical' || a.status === 'warning').length;

  return (
    <div className="app-container">
      {/* Top Header & Simulation Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSimulateAnomaly={handleSimulateAnomaly}
        onResetNominal={handleResetNominal}
        isAutonomousActive={isAutonomousActive}
        setIsAutonomousActive={setIsAutonomousActive}
        criticalCount={criticalCount}
      />

      <main className="main-viewport">
        {/* Digital Twin Smart Factory Overview Banner */}
        <FacilityHeroBanner 
          assets={assets}
          onSelectAsset={(assetId) => {
            setSelectedAssetId(assetId);
            setActiveTab('maintenance');
          }}
        />

        {/* KPI Strip */}
        <MetricCards metrics={metrics} />

        {/* View Switching */}
        {activeTab === 'maintenance' && (
          <PredictiveMaintenanceView
            assets={assets}
            selectedAssetId={selectedAssetId}
            setSelectedAssetId={setSelectedAssetId}
            onThrottleAsset={handleThrottleAsset}
            onGenerateWorkOrder={handleGenerateWorkOrder}
            onAskCopilot={handleAskCopilot}
          />
        )}

        {activeTab === 'vision' && (
          <VisualInspectionView
            samples={samples}
            selectedSampleId={selectedSampleId}
            setSelectedSampleId={setSelectedSampleId}
            onAskCopilot={handleAskCopilot}
          />
        )}

        {activeTab === 'copilot' && (
          <CopilotView
            messages={copilotMessages}
            onSendMessage={handleSendMessage}
            onThrottleAsset={handleThrottleAsset}
            onGenerateWorkOrder={handleGenerateWorkOrder}
          />
        )}

        {activeTab === 'sustainability' && (
          <SustainabilityView metrics={metrics} />
        )}

        {activeTab === 'architecture' && (
          <CloudArchitectureView stack={GCP_ARCHITECTURE_STACK} />
        )}
      </main>

      {/* Global Floating Issue Chatbot Widget */}
      <FloatingChatbot
        assets={assets}
        samples={samples}
        criticalCount={criticalCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onThrottleAsset={handleThrottleAsset}
        onGenerateWorkOrder={handleGenerateWorkOrder}
        onResetNominal={handleResetNominal}
        onSimulateAnomaly={handleSimulateAnomaly}
      />
    </div>
  );
}
