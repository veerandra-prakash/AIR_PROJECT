import React from 'react';
import { Activity, Clock, Layers, Award, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export function MetricsPanel({ result, isAnimating }) {
  const { pathFound, pathLength, exploredCount, executionTimeMs, errorMsg } = result;

  return (
    <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="var(--accent-cyan)" />
          Algorithm Execution Metrics
        </h3>
        {isAnimating && (
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
            ⚡ Animating search expansion...
          </span>
        )}
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--accent-red)',
          fontSize: '0.875rem'
        }}>
          <AlertTriangle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="metrics-grid">
        {/* Status Card */}
        <div className={`metric-card ${pathFound ? 'green' : 'gold'}`}>
          <div className="metric-header">
            <span>PATH STATUS</span>
            {pathFound ? <CheckCircle2 size={16} color="var(--accent-green)" /> : <XCircle size={16} color="var(--accent-red)" />}
          </div>
          <div className="metric-value" style={{ color: pathFound ? 'var(--accent-green)' : (errorMsg ? 'var(--accent-red)' : 'var(--text-muted)') }}>
            {pathFound ? 'FOUND' : (errorMsg ? 'NO PATH' : 'READY')}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            {pathFound ? 'Optimal path found' : 'Awaiting computation'}
          </span>
        </div>

        {/* Path Length Card */}
        <div className="metric-card gold">
          <div className="metric-header">
            <span>PATH LENGTH</span>
            <Award size={16} color="var(--accent-gold)" />
          </div>
          <div className="metric-value">
            {pathFound ? `${pathLength} moves` : '0 moves'}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            Total edges traversed
          </span>
        </div>

        {/* Explored Nodes Card */}
        <div className="metric-card purple">
          <div className="metric-header">
            <span>EXPLORED NODES</span>
            <Layers size={16} color="var(--accent-purple)" />
          </div>
          <div className="metric-value">
            {exploredCount}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            Evaluated grid states
          </span>
        </div>

        {/* Execution Time Card */}
        <div className="metric-card">
          <div className="metric-header">
            <span>EXECUTION TIME</span>
            <Clock size={16} color="var(--accent-cyan)" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.25rem' }}>
            {executionTimeMs > 0 ? `${executionTimeMs} ms` : '0.000 ms'}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            CPU time (performance.now)
          </span>
        </div>
      </div>
    </div>
  );
}
