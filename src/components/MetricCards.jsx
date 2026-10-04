import React from 'react';
import { Gauge, Radio, ShieldCheck, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function MetricCards({ metrics }) {
  return (
    <section className="metrics-grid" aria-label="Factory Key Performance Indicators">
      {/* Metric 1: OEE */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-title">Overall Equipment Effectiveness (OEE)</span>
          <div className="metric-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#00f2fe' }}>
            <Gauge size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{metrics.oee.value}%</span>
          <span className="metric-delta positive">
            <ArrowUpRight size={14} /> +2.8% vs Target
          </span>
        </div>
        <div style={{ marginTop: '0.6rem', display: 'flex', gap: '4px', height: '5px', borderRadius: '3px', overflow: 'hidden', background: '#1e293b' }}>
          <div style={{ width: `${metrics.availability.value}%`, background: '#38bdf8' }} title={`Availability: ${metrics.availability.value}%`} />
          <div style={{ width: `${metrics.performance.value}%`, background: '#818cf8' }} title={`Performance: ${metrics.performance.value}%`} />
          <div style={{ width: `${metrics.quality.value}%`, background: '#34d399' }} title={`Quality: ${metrics.quality.value}%`} />
        </div>
        <div className="metric-subtext" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Avail: {metrics.availability.value}%</span>
          <span>Perf: {metrics.performance.value}%</span>
          <span>Qual: {metrics.quality.value}%</span>
        </div>
      </div>

      {/* Metric 2: Stream Ingestion */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-title">Google Cloud Pub/Sub & Dataflow</span>
          <div className="metric-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
            <Radio size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">48.2k</span>
          <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>events/sec</span>
          <span className="metric-delta positive">
            <ArrowUpRight size={14} /> 99.999% SLA
          </span>
        </div>
        <div className="metric-subtext">
          <span>Windowed latency &lt; 18ms • BigQuery streaming buffer active</span>
        </div>
      </div>

      {/* Metric 3: Scrap Reduction */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-title">Vertex AI Vision Scrap Rate</span>
          <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <ShieldCheck size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{metrics.scrapReduction.value}</span>
          <span className="metric-delta positive">
            <ArrowDownRight size={14} /> -3.4% down from {metrics.scrapReduction.prev}
          </span>
        </div>
        <div className="metric-subtext">
          <span>Real-time optical quarantine prevented 142 defective assemblies</span>
        </div>
      </div>

      {/* Metric 4: Downtime Cost Saved */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-title">Predictive Maintenance Savings</span>
          <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <DollarSign size={18} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value" style={{ color: '#34d399' }}>$328,000</span>
          <span className="metric-delta positive">
            <ArrowUpRight size={14} /> 64.5h Avoided
          </span>
        </div>
        <div className="metric-subtext">
          <span>3 catastrophic bearing & turbine failures preempted this month</span>
        </div>
      </div>
    </section>
  );
}
