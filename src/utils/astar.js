/**
 * A* Pathfinding Algorithm Implementation
 * Grid representation: 0-indexed (row, col)
 * Distance metric: Manhattan Distance
 * Movement: 4-directional (Up, Down, Left, Right)
 */

export function manhattanDistance(posA, posB) {
  return Math.abs(posA.r - posB.r) + Math.abs(posA.c - posB.c);
}

/**
 * Solve A* path planning problem
 * @param {number} gridSize - Size of the grid (N x N)
 * @param {{r: number, c: number}} start - Start coordinates
 * @param {{r: number, c: number}} goal - Goal coordinates
 * @param {Set<string>|Array<string>} obstacles - Set/Array of obstacle coordinate strings "r,c"
 * @returns {Object} Algorithm result summary
 */
export function solveAStar(gridSize, start, goal, obstacles) {
  const startTime = performance.now();

  const obstacleSet = obstacles instanceof Set ? obstacles : new Set(obstacles);

  // Validate start and goal
  const key = (r, c) => `${r},${c}`;

  if (start.r < 0 || start.r >= gridSize || start.c < 0 || start.c >= gridSize) {
    return {
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredNodes: [],
      exploredCount: 0,
      executionTimeMs: 0,
      errorMsg: "Start point is out of grid bounds."
    };
  }

  if (goal.r < 0 || goal.r >= gridSize || goal.c < 0 || goal.c >= gridSize) {
    return {
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredNodes: [],
      exploredCount: 0,
      executionTimeMs: 0,
      errorMsg: "Goal point is out of grid bounds."
    };
  }

  if (obstacleSet.has(key(start.r, start.c))) {
    return {
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredNodes: [],
      exploredCount: 0,
      executionTimeMs: performance.now() - startTime,
      errorMsg: "Start point is on an obstacle!"
    };
  }

  if (obstacleSet.has(key(goal.r, goal.c))) {
    return {
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredNodes: [],
      exploredCount: 0,
      executionTimeMs: performance.now() - startTime,
      errorMsg: "Goal point is blocked by an obstacle!"
    };
  }

  // 4-Direction movement: Up, Down, Left, Right
  const directions = [
    { r: -1, c: 0, name: 'Up' },
    { r: 1, c: 0, name: 'Down' },
    { r: 0, c: -1, name: 'Left' },
    { r: 0, c: 1, name: 'Right' }
  ];

  // Min-Priority Queue structure
  const openSet = []; // Array of nodes sorted by f score
  const openSetMap = new Map(); // key -> node
  const closedSet = new Set();
  const exploredNodes = []; // Array of {r, c} in exploration order

  const startNode = {
    r: start.r,
    c: start.c,
    g: 0,
    h: manhattanDistance(start, goal),
    f: manhattanDistance(start, goal),
    parent: null
  };

  openSet.push(startNode);
  openSetMap.set(key(start.r, start.c), startNode);

  let goalNode = null;

  while (openSet.length > 0) {
    // Sort openSet by f-score ascending; tie-break with lower h-score
    openSet.sort((a, b) => (a.f === b.f ? a.h - b.h : a.f - b.f));

    // Pop node with smallest f-score
    const current = openSet.shift();
    const currentKey = key(current.r, current.c);
    openSetMap.delete(currentKey);

    if (closedSet.has(currentKey)) continue;

    closedSet.add(currentKey);
    exploredNodes.push({ r: current.r, c: current.c });

    // Check if goal reached
    if (current.r === goal.r && current.c === goal.c) {
      goalNode = current;
      break;
    }

    // Evaluate 4 neighbors
    for (const dir of directions) {
      const nr = current.r + dir.r;
      const nc = current.c + dir.c;
      const nKey = key(nr, nc);

      // Boundary check
      if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) continue;

      // Obstacle check
      if (obstacleSet.has(nKey)) continue;

      // Closed set check
      if (closedSet.has(nKey)) continue;

      const tentativeG = current.g + 1;

      const existingInOpen = openSetMap.get(nKey);

      if (!existingInOpen) {
        const h = manhattanDistance({ r: nr, c: nc }, goal);
        const neighborNode = {
          r: nr,
          c: nc,
          g: tentativeG,
          h: h,
          f: tentativeG + h,
          parent: current
        };
        openSet.push(neighborNode);
        openSetMap.set(nKey, neighborNode);
      } else if (tentativeG < existingInOpen.g) {
        existingInOpen.g = tentativeG;
        existingInOpen.f = tentativeG + existingInOpen.h;
        existingInOpen.parent = current;
      }
    }
  }

  const endTime = performance.now();
  const executionTimeMs = parseFloat((endTime - startTime).toFixed(3));

  if (!goalNode) {
    return {
      pathFound: false,
      path: [],
      pathLength: 0,
      exploredNodes,
      exploredCount: exploredNodes.length,
      executionTimeMs,
      errorMsg: "No valid path exists between start and goal!"
    };
  }

  // Reconstruct path
  const path = [];
  let curr = goalNode;
  while (curr) {
    path.unshift({ r: curr.r, c: curr.c });
    curr = curr.parent;
  }

  // Path length in moves = path.length - 1
  const pathLength = Math.max(0, path.length - 1);

  return {
    pathFound: true,
    path,
    pathLength,
    exploredNodes,
    exploredCount: exploredNodes.length,
    executionTimeMs,
    errorMsg: null
  };
}
