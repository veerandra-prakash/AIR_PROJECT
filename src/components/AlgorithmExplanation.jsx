import React from 'react';
import { BookOpen, Compass, Grid, FunctionSquare, ArrowRightLeft } from 'lucide-react';

export function AlgorithmExplanation() {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BookOpen size={20} color="var(--accent-cyan)" />
        Theoretical Foundations & Algorithm Specification
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Card 1: A* Algorithm */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>
            <FunctionSquare size={18} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>A* Pathfinding Formulation</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            A* is an informed search algorithm that selects paths by minimizing evaluation function:
          </p>
          <div className="math-card" style={{ margin: '0.75rem 0' }}>
            <span>f(n) = g(n) + h(n)</span>
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li><strong style={{ color: 'var(--text-main)' }}>g(n)</strong>: Exact cost from Start node to current node <code>n</code>.</li>
            <li><strong style={{ color: 'var(--text-main)' }}>h(n)</strong>: Estimated heuristic cost from node <code>n</code> to Goal node.</li>
            <li><strong style={{ color: 'var(--text-main)' }}>f(n)</strong>: Estimated total cost of path through node <code>n</code>.</li>
          </ul>
        </div>

        {/* Card 2: Manhattan Distance */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>
            <Compass size={18} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Manhattan Distance Heuristic</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            For 4-directional grid motion, the Manhattan metric calculates absolute grid steps:
          </p>
          <div className="math-card" style={{ margin: '0.75rem 0', borderColor: 'rgba(129, 140, 248, 0.3)', color: 'var(--accent-purple)' }}>
            <span>h(n) = |r_goal - r_current| + |c_goal - c_current|</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            This heuristic is <strong>admissible</strong> (never overestimates the true cost) and <strong>consistent</strong>, guaranteeing an optimal shortest path without unnecessary node expansions.
          </p>
        </div>

        {/* Card 3: Grid & Movement */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
            <Grid size={18} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Grid Matrix & Motion Rules</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            The 2D workspace is modeled as an <code>N × N</code> matrix with 0-based indexing <code>(r, c)</code>.
          </p>
          <div style={{ margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRightLeft size={14} color="var(--accent-gold)" />
              <span><strong>4-Directional Constraints:</strong> Up (-1,0), Down (+1,0), Left (0,-1), Right (0,+1).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ padding: '0.1rem 0.4rem', background: '#334155', borderRadius: '3px', fontSize: '0.7rem' }}>Matrix</span>
              <span><code>0</code> = Free Cell (Cost = 1), <code>1</code> = Obstacle / Wall (Impassable).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
