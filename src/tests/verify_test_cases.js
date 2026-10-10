import { solveAStar } from '../utils/astar.js';
import { TEST_CASES } from '../utils/testCases.js';

console.log("==================================================");
console.log("   AUTOMATED VERIFICATION OF A* TEST CASES");
console.log("==================================================\n");

// Test Case 1
const tc1 = TEST_CASES.TEST_CASE_1;
const res1 = solveAStar(tc1.gridSize, tc1.start, tc1.goal, tc1.obstacles);

console.log(`[TEST CASE 1] ${tc1.name}`);
console.log(`Grid: ${tc1.gridSize}x${tc1.gridSize} | Start: (${tc1.start.r},${tc1.start.c}) | Goal: (${tc1.goal.r},${tc1.goal.c})`);
console.log(`Path Found: ${res1.pathFound}`);
console.log(`Path Length (moves): ${res1.pathLength} (Expected: ${tc1.expectedPathLength})`);
console.log(`Explored Nodes Count: ${res1.exploredCount}`);
console.log(`Execution Time: ${res1.executionTimeMs} ms`);
console.log(`Path sequence: ${res1.path.map(p => `(${p.r},${p.c})`).join(' -> ')}`);
console.assert(res1.pathLength === tc1.expectedPathLength, `FAIL: Expected ${tc1.expectedPathLength} moves, got ${res1.pathLength}`);
console.log(res1.pathLength === tc1.expectedPathLength ? "✅ PASS: Test Case 1 Verified!\n" : "❌ FAIL: Test Case 1 Mismatch!\n");

// Test Case 2
const tc2 = TEST_CASES.TEST_CASE_2;
const res2 = solveAStar(tc2.gridSize, tc2.start, tc2.goal, tc2.obstacles);

console.log(`[TEST CASE 2] ${tc2.name}`);
console.log(`Grid: ${tc2.gridSize}x${tc2.gridSize} | Start: (${tc2.start.r},${tc2.start.c}) | Goal: (${tc2.goal.r},${tc2.goal.c})`);
console.log(`Obstacles: ${tc2.obstacles.join(', ')}`);
console.log(`Path Found: ${res2.pathFound}`);
console.log(`Path Length (moves): ${res2.pathLength} (Expected: ${tc2.expectedPathLength})`);
console.log(`Explored Nodes Count: ${res2.exploredCount}`);
console.log(`Execution Time: ${res2.executionTimeMs} ms`);
console.log(`Path sequence: ${res2.path.map(p => `(${p.r},${p.c})`).join(' -> ')}`);
console.assert(res2.pathLength === tc2.expectedPathLength, `FAIL: Expected ${tc2.expectedPathLength} moves, got ${res2.pathLength}`);
console.log(res2.pathLength === tc2.expectedPathLength ? "✅ PASS: Test Case 2 Verified!\n" : "❌ FAIL: Test Case 2 Mismatch!\n");

console.log("==================================================");
