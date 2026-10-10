import React from 'react';
import { Cpu, Server, Globe, Sparkles } from 'lucide-react';

export function Header({ isVercel }) {
  return (
    <header className="glass-card header-card">
      <div className="header-top">
        <div className="header-title-group">
          <div className="header-icon">
            <Cpu size={26} />
          </div>
          <div>
            <div className="header-subtitle">Practical Experiment Presentation</div>
            <h1 className="header-title">Robot Path Planning — A* Algorithm</h1>
          </div>
        </div>

        <div className="environment-badge-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div className={`environment-badge ${isVercel ? 'vercel' : 'local'}`}>
            {isVercel ? <Globe size={14} /> : <Server size={14} />}
            <span>Environment: {isVercel ? 'Vercel Deployed' : 'Localhost Execution'}</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            background: 'rgba(251, 191, 36, 0.1)',
            color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.3)'
          }}>
            <Sparkles size={14} />
            <span>Manhattan Heuristic</span>
          </div>
        </div>
      </div>
    </header>
  );
}
