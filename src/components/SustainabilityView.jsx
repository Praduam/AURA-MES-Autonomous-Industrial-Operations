import React, { useState } from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Zap, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  BarChart, 
  Cpu,
  Layers
} from 'lucide-react';

export default function SustainabilityView({ metrics }) {
  const [peakShiftEnabled, setPeakShiftEnabled] = useState(true);
  const [targetOEE, setTargetOEE] = useState(85);

  const unmanagedCost = 84200;
  const optimizedCost = peakShiftEnabled ? 63800 : 84200;
  const monthlySavings = unmanagedCost - optimizedCost;
  const co2AvoidedTons = peakShiftEnabled ? 18.6 : 4.2;

  return (
    <div>
      {/* Top Sustainability Summary Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.1))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem 1.75rem',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
            <Leaf size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Autonomous Industrial Decarbonization & OEE Engine
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px' }}>
              Vertex AI algorithms orchestrate production schedules to align high-energy thermal and machining cycles with peak renewable grid availability.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CO2 Avoidance</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              {co2AvoidedTons} Metric Tons
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Energy Saved</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              ${monthlySavings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="two-col-layout">
        {/* Left Column: Overall Equipment Effectiveness (OEE) Deep Breakdown */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title-area">
              <TrendingUp size={20} color="#00e5ff" />
              <h3 className="panel-title">Overall Equipment Effectiveness (OEE) Breakdown</h3>
            </div>
            <span className="badge badge-optimal">Composite: {metrics.oee.value}%</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            OEE measures truly productive manufacturing time. By eliminating unplanned downtime with predictive maintenance and minimizing optical rejects, AURA-MES achieves top-quartile world-class manufacturing standards (&gt;85%).
          </p>

          {/* OEE Factor 1: Availability */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Availability (Operating Time / Planned Time)</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{metrics.availability.value}% (Target: 92.0%)</span>
            </div>
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${metrics.availability.value}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
              Unplanned downtime mitigated from 18.2h down to 2.4h per week via early bearing/blade vibration intervention.
            </div>
          </div>

          {/* OEE Factor 2: Performance */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Performance (Net Operating Rate / Ideal Cycle)</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#818cf8' }}>{metrics.performance.value}% (Target: 90.0%)</span>
            </div>
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${metrics.performance.value}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
              Automated feed-rate throttling avoids full line stoppages while keeping throughput at 89.6% of theoretical max.
            </div>
          </div>

          {/* OEE Factor 3: Quality */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Quality (Good Units Produced / Total Units)</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>{metrics.quality.value}% (Target: 99.0%)</span>
            </div>
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${metrics.quality.value}%`, height: '100%', background: 'linear-gradient(90deg, #059669, #34d399)' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
              Optical AI quarantine catches defects in real-time, preventing downstream compounding assembly waste.
            </div>
          </div>

          {/* Formula calculation box */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px', padding: '0.85rem', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#cbd5e1' }}>
            <div>OEE Formula: Availability × Performance × Quality</div>
            <div style={{ color: '#00f2fe', marginTop: '2px' }}>
              = {metrics.availability.value}% × {metrics.performance.value}% × {metrics.quality.value}% = <strong>{metrics.oee.value}%</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Peak Energy Shifting & Scrap Reduction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Energy Shifting Console */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title-area">
                <Zap size={18} color="#fbbf24" />
                <h3 className="panel-title">Dynamic Peak Grid Shifting (Vertex AI)</h3>
              </div>
              <button 
                className={`btn-secondary ${peakShiftEnabled ? 'active' : ''}`}
                onClick={() => setPeakShiftEnabled(!peakShiftEnabled)}
                style={peakShiftEnabled ? { borderColor: '#10b981', color: '#34d399' } : {}}
              >
                {peakShiftEnabled ? 'Optimizer: ACTIVE' : 'Optimizer: OFF'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(10, 16, 30, 0.6)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Unmanaged Baseline Cost</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                  ${unmanagedCost.toLocaleString()}/mo
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>Peak tariff rate: $0.24 / kWh</div>
              </div>

              <div style={{ background: 'rgba(10, 16, 30, 0.6)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>AI-Optimized Tariff Cost</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  ${optimizedCost.toLocaleString()}/mo
                </div>
                <div style={{ fontSize: '0.68rem', color: '#34d399', marginTop: '2px' }}>
                  {peakShiftEnabled ? `Saved $${monthlySavings.toLocaleString()} (-24.2%)` : 'No savings active'}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The AI model analyzes day-ahead wholesale electricity price curves, ambient temperatures, and factory production quotas to automatically shift heavy 50MW+ melting, stamping, and annealing loads to solar and wind peaks.
            </p>
          </div>

          {/* Waste & Material Scrap Reduction */}
          <div className="glass-panel">
            <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                Material Circularity & Scrap Reduction
              </span>
              <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700 }}>-76% Scrap Loss</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e293b' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pre-AI Manual Inspection Scrap Rate:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f87171' }}>4.2% of total output</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e293b' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Vertex AI Closed-Loop Optical Scrap Rate:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>0.8% of total output</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Titanium & Copper Substrate Saved:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>1,840 kg / month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
