import React from 'react';
import { Play, RotateCcw, Trash2, ShieldAlert, Flag, Compass, Sliders, Zap, CheckCircle2 } from 'lucide-react';

export function ControlPanel({
  gridSize,
  setGridSize,
  activeMode,
  setActiveMode,
  onRunAlgorithm,
  onResetPath,
  onClearObstacles,
  onLoadTestCase,
  activeTestCaseId,
  isAnimating,
  animationSpeed,
  setAnimationSpeed
}) {
  return (
    <div className="glass-card controls-card">
      <div>
        <div className="section-label">
          <Zap size={14} /> Preset Test Cases
        </div>
        <div className="button-group">
          <button
            className={`btn btn-test ${activeTestCaseId === 1 ? 'active' : ''}`}
            onClick={() => onLoadTestCase(1)}
            disabled={isAnimating}
          >
            {activeTestCaseId === 1 && <CheckCircle2 size={14} />}
            Test Case 1: Free Grid
          </button>
          <button
            className={`btn btn-test ${activeTestCaseId === 2 ? 'active' : ''}`}
            onClick={() => onLoadTestCase(2)}
            disabled={isAnimating}
          >
            {activeTestCaseId === 2 && <CheckCircle2 size={14} />}
            Test Case 2: Detour Grid
          </button>
        </div>
      </div>

      <div>
        <div className="section-label">
          <Sliders size={14} /> Interactive Placement Mode
        </div>
        <div className="mode-selector">
          <button
            className={`mode-btn ${activeMode === 'obstacle' ? 'active-obstacle' : ''}`}
            onClick={() => setActiveMode('obstacle')}
          >
            <ShieldAlert size={16} />
            Obstacle
          </button>
          <button
            className={`mode-btn ${activeMode === 'start' ? 'active-start' : ''}`}
            onClick={() => setActiveMode('start')}
          >
            <Compass size={16} />
            Start (S)
          </button>
          <button
            className={`mode-btn ${activeMode === 'goal' ? 'active-goal' : ''}`}
            onClick={() => setActiveMode('goal')}
          >
            <Flag size={16} />
            Goal (G)
          </button>
        </div>
      </div>

      <div>
        <div className="section-label">
          Grid Size & Animation Speed
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              Grid Dimensions
            </label>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              disabled={isAnimating}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem'
              }}
            >
              <option value={5}>5 × 5 Grid (Default)</option>
              <option value={6}>6 × 6 Grid</option>
              <option value={8}>8 × 8 Grid</option>
              <option value={10}>10 × 10 Grid</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              Animation Speed
            </label>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              disabled={isAnimating}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem'
              }}
            >
              <option value={0}>Instant (0 ms)</option>
              <option value={30}>Fast (30 ms)</option>
              <option value={80}>Normal (80 ms)</option>
              <option value={150}>Slow (150 ms)</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          className="btn btn-primary"
          onClick={onRunAlgorithm}
          disabled={isAnimating}
          style={{ padding: '0.8rem 1rem', fontSize: '1rem' }}
        >
          <Play size={18} fill="currentColor" />
          {isAnimating ? 'Computing Path...' : 'Run A* Pathfinding'}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={onResetPath} disabled={isAnimating}>
            <RotateCcw size={14} />
            Reset Visuals
          </button>
          <button className="btn btn-secondary" onClick={onClearObstacles} disabled={isAnimating}>
            <Trash2 size={14} />
            Clear Walls
          </button>
        </div>
      </div>
    </div>
  );
}
