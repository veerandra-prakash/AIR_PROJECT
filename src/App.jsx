import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { GridVisualizer } from './components/GridVisualizer';
import { MetricsPanel } from './components/MetricsPanel';
import { ComparisonTable } from './components/ComparisonTable';
import { AlgorithmExplanation } from './components/AlgorithmExplanation';
import { PresentationNotes } from './components/PresentationNotes';
import { solveAStar } from './utils/astar';
import { TEST_CASES } from './utils/testCases';

export function App() {
  // State variables
  const [gridSize, setGridSize] = useState(5);
  const [start, setStart] = useState({ r: 0, c: 0 });
  const [goal, setGoal] = useState({ r: 3, c: 3 });
  const [obstacles, setObstacles] = useState(new Set());
  const [activeMode, setActiveMode] = useState('obstacle'); // 'obstacle' | 'start' | 'goal'
  const [activeTestCaseId, setActiveTestCaseId] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(30);
  const [isAnimating, setIsAnimating] = useState(false);

  // Visualization state
  const [exploredNodesSet, setExploredNodesSet] = useState(new Set());
  const [pathNodesMap, setPathNodesMap] = useState(new Map());

  // Result state
  const [result, setResult] = useState({
    pathFound: false,
    path: [],
    pathLength: 0,
    exploredCount: 0,
    executionTimeMs: 0,
    errorMsg: null
  });

  // Environment check (Vercel vs Local)
  const [isVercel, setIsVercel] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app') || (!hostname.includes('localhost') && !hostname.includes('127.0.0.1'))) {
      setIsVercel(true);
    }
  }, []);

  // Animation timeout ref for cleanup
  const animationTimerRef = useRef([]);

  const clearAnimationTimers = () => {
    animationTimerRef.current.forEach((t) => clearTimeout(t));
    animationTimerRef.current = [];
  };

  // Load Test Case preset
  const loadTestCase = (id) => {
    clearAnimationTimers();
    setIsAnimating(false);
    setExploredNodesSet(new Set());
    setPathNodesMap(new Map());

    const tc = id === 1 ? TEST_CASES.TEST_CASE_1 : TEST_CASES.TEST_CASE_2;
    setActiveTestCaseId(id);
    setGridSize(tc.gridSize);
    setStart(tc.start);
    setGoal(tc.goal);
    setObstacles(new Set(tc.obstacles));

    // Immediately execute algorithm to populate result panel
    const res = solveAStar(tc.gridSize, tc.start, tc.goal, tc.obstacles);
    setResult(res);

    // Populate visual path immediately without slow animation on load
    const pMap = new Map();
    res.path.forEach((node, idx) => {
      pMap.set(`${node.r},${node.c}`, idx);
    });
    setPathNodesMap(pMap);

    const expSet = new Set();
    res.exploredNodes.forEach((node) => expSet.add(`${node.r},${node.c}`));
    setExploredNodesSet(expSet);
  };

  // On initial mount, load Test Case 1
  useEffect(() => {
    loadTestCase(1);
  }, []);

  // Grid size change handler
  const handleGridSizeChange = (newSize) => {
    setGridSize(newSize);
    setActiveTestCaseId(null);
    setExploredNodesSet(new Set());
    setPathNodesMap(new Map());

    // Adjust start and goal if outside bounds
    if (start.r >= newSize || start.c >= newSize) setStart({ r: 0, c: 0 });
    if (goal.r >= newSize || goal.c >= newSize) setGoal({ r: newSize - 1, c: newSize - 1 });
  };

  // Cell click handler
  const handleCellClick = (r, c) => {
    if (isAnimating) return;
    setActiveTestCaseId(null);

    if (activeMode === 'start') {
      if (goal.r === r && goal.c === c) return;
      setStart({ r, c });
      // Remove obstacle if placed on start
      setObstacles((prev) => {
        const next = new Set(prev);
        next.delete(`${r},${c}`);
        return next;
      });
    } else if (activeMode === 'goal') {
      if (start.r === r && start.c === c) return;
      setGoal({ r, c });
      // Remove obstacle if placed on goal
      setObstacles((prev) => {
        const next = new Set(prev);
        next.delete(`${r},${c}`);
        return next;
      });
    } else if (activeMode === 'obstacle') {
      if ((start.r === r && start.c === c) || (goal.r === r && goal.c === c)) return;
      setObstacles((prev) => {
        const next = new Set(prev);
        const key = `${r},${c}`;
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    }
  };

  const handleCellDrag = (r, c) => {
    if (isAnimating || activeMode !== 'obstacle') return;
    if ((start.r === r && start.c === c) || (goal.r === r && goal.c === c)) return;
    setActiveTestCaseId(null);
    setObstacles((prev) => {
      const next = new Set(prev);
      next.add(`${r},${c}`);
      return next;
    });
  };

  // Run A* algorithm with optional step animation
  const runAlgorithm = () => {
    clearAnimationTimers();
    setExploredNodesSet(new Set());
    setPathNodesMap(new Map());

    const res = solveAStar(gridSize, start, goal, obstacles);
    setResult(res);

    if (animationSpeed === 0 || res.exploredNodes.length === 0) {
      // Instant execution visualization
      const expSet = new Set();
      res.exploredNodes.forEach((node) => expSet.add(`${node.r},${node.c}`));
      setExploredNodesSet(expSet);

      const pMap = new Map();
      res.path.forEach((node, idx) => {
        pMap.set(`${node.r},${node.c}`, idx);
      });
      setPathNodesMap(pMap);
      return;
    }

    // Step-by-step animated search expansion
    setIsAnimating(true);
    const expSet = new Set();

    res.exploredNodes.forEach((node, idx) => {
      const timer = setTimeout(() => {
        expSet.add(`${node.r},${node.c}`);
        setExploredNodesSet(new Set(expSet));

        // When exploration completes, animate path drawing
        if (idx === res.exploredNodes.length - 1) {
          const pMap = new Map();
          res.path.forEach((pNode, pIdx) => {
            const pTimer = setTimeout(() => {
              pMap.set(`${pNode.r},${pNode.c}`, pIdx);
              setPathNodesMap(new Map(pMap));
              if (pIdx === res.path.length - 1) {
                setIsAnimating(false);
              }
            }, pIdx * (animationSpeed * 1.2));
            animationTimerRef.current.push(pTimer);
          });
        }
      }, idx * animationSpeed);
      animationTimerRef.current.push(timer);
    });
  };

  const resetPathVisuals = () => {
    clearAnimationTimers();
    setIsAnimating(false);
    setExploredNodesSet(new Set());
    setPathNodesMap(new Map());
    setResult({
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredCount: 0,
      executionTimeMs: 0,
      errorMsg: null
    });
  };

  const clearObstacles = () => {
    setObstacles(new Set());
    setActiveTestCaseId(null);
    resetPathVisuals();
  };

  return (
    <div className="app-container">
      {/* Header Banner */}
      <Header isVercel={isVercel} />

      {/* Main Visualizer Section */}
      <main className="main-layout">
        {/* Left Column: Controls */}
        <ControlPanel
          gridSize={gridSize}
          setGridSize={handleGridSizeChange}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          onRunAlgorithm={runAlgorithm}
          onResetPath={resetPathVisuals}
          onClearObstacles={clearObstacles}
          onLoadTestCase={loadTestCase}
          activeTestCaseId={activeTestCaseId}
          isAnimating={isAnimating}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
        />

        {/* Right Column: Interactive Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GridVisualizer
            gridSize={gridSize}
            start={start}
            goal={goal}
            obstacles={obstacles}
            exploredNodesSet={exploredNodesSet}
            pathNodesMap={pathNodesMap}
            activeMode={activeMode}
            onCellClick={handleCellClick}
            onCellDrag={handleCellDrag}
          />

          {/* Results Panel */}
          <MetricsPanel result={result} isAnimating={isAnimating} />
        </div>
      </main>

      {/* Experimental Comparison Table Panel */}
      <ComparisonTable
        isVercel={isVercel}
        currentResult={result}
        activeTestCaseId={activeTestCaseId}
      />

      {/* Algorithm & Mathematics Explanation */}
      <AlgorithmExplanation />

      {/* Presentation Defense Notes & Conclusions */}
      <PresentationNotes />
    </div>
  );
}

export default App;
