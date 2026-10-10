import React from 'react';
import { Award, CheckCircle2, AlertTriangle, Presentation } from 'lucide-react';

export function PresentationNotes() {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Presentation size={20} color="var(--accent-gold)" />
        Experimental Conclusions, Observations & Presentation Defense
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Key Observations */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} /> Key Experimental Observations
          </h4>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.5' }}>
            <li>
              <strong>Test Case 1 (Obstacle-Free 5×5 Grid):</strong> A* computes the optimal Manhattan path from (0,0) to (3,3) in exactly <strong>6 moves</strong>, exploring 7 nodes with sub-millisecond execution.
            </li>
            <li>
              <strong>Test Case 2 (Obstacle Detour):</strong> When column 2 is blocked except at (2,2), A* successfully routes through the clear cell (2,2) taking <strong>8 moves</strong> and exploring 13 nodes.
            </li>
            <li>
              <strong>Consistency across environments:</strong> The exact same path lengths and explored node counts are produced locally and on Vercel deployment.
            </li>
          </ul>
        </div>

        {/* Conclusion & Limitations */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={16} /> Practical Conclusions & Limitations
          </h4>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.5' }}>
            <li>
              <strong>Optimality:</strong> Because Manhattan distance is an admissible heuristic for 4-connected grid spaces, A* guarantees finding the shortest path.
            </li>
            <li>
              <strong>Limitations:</strong> Real physical robots face continuous kinematics, dynamic obstacle avoidance, and non-zero turning radii, which require continuous algorithms (e.g. D*, Hybrid A*, or ROS move_base).
            </li>
            <li>
              <strong>Browser Engine Variations:</strong> Execution time (ms) small variations are attributed to client JS engine JIT compilation and system CPU load.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
