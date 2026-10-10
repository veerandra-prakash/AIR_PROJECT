import React, { useState } from 'react';
import { Compass, Flag, ShieldAlert, Navigation } from 'lucide-react';

export function GridVisualizer({
  gridSize,
  start,
  goal,
  obstacles,
  exploredNodesSet,
  pathNodesMap,
  activeMode,
  onCellClick,
  onCellDrag
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (r, c) => {
    setIsMouseDown(true);
    onCellClick(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (isMouseDown && activeMode === 'obstacle') {
      onCellDrag(r, c);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Build rows and columns
  const rows = Array.from({ length: gridSize }, (_, r) => r);
  const cols = Array.from({ length: gridSize }, (_, c) => c);

  return (
    <div
      className="glass-card grid-container-card"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div
        className="grid-wrapper"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(40px, 1fr))`,
        }}
      >
        {rows.map((r) =>
          cols.map((c) => {
            const key = `${r},${c}`;
            const isStart = start.r === r && start.c === c;
            const isGoal = goal.r === r && goal.c === c;
            const isObstacle = obstacles.has(key);
            const isPath = pathNodesMap.has(key);
            const pathStepIndex = pathNodesMap.get(key);
            const isExplored = exploredNodesSet.has(key);

            let cellClass = 'grid-cell';
            if (isStart) cellClass += ' start-cell';
            else if (isGoal) cellClass += ' goal-cell';
            else if (isObstacle) cellClass += ' obstacle-cell';
            else if (isPath) cellClass += ' path-cell';
            else if (isExplored) cellClass += ' explored-cell';

            return (
              <div
                key={key}
                className={cellClass}
                onMouseDown={() => handleMouseDown(r, c)}
                onMouseEnter={() => handleMouseEnter(r, c)}
                title={`Cell (${r}, ${c})`}
              >
                <span className="cell-coord">
                  {r},{c}
                </span>

                {isStart && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Compass size={20} />
                    <span style={{ fontSize: '0.65rem' }}>START</span>
                  </div>
                )}

                {isGoal && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Flag size={20} />
                    <span style={{ fontSize: '0.65rem' }}>GOAL</span>
                  </div>
                )}

                {!isStart && !isGoal && isPath && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Navigation size={14} style={{ transform: 'rotate(45deg)' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>#{pathStepIndex}</span>
                  </div>
                )}

                {!isStart && !isGoal && !isPath && isObstacle && (
                  <ShieldAlert size={14} style={{ opacity: 0.4 }} />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Visual Legend */}
      <div className="grid-legend">
        <div className="legend-item">
          <div className="legend-box start"></div>
          <span>Start (S)</span>
        </div>
        <div className="legend-item">
          <div className="legend-box goal"></div>
          <span>Goal (G)</span>
        </div>
        <div className="legend-item">
          <div className="legend-box obstacle"></div>
          <span>Obstacle (Wall)</span>
        </div>
        <div className="legend-item">
          <div className="legend-box explored"></div>
          <span>Explored Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-box path"></div>
          <span>Shortest Path</span>
        </div>
      </div>
    </div>
  );
}
