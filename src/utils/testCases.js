/**
 * Predefined Verification Test Cases as specified in the assignment
 */

export const TEST_CASES = {
  TEST_CASE_1: {
    id: 1,
    name: "Test Case 1: Obstacle-Free Grid",
    description: "5×5 grid with Start at (0,0) and Goal at (3,3). No obstacles present.",
    gridSize: 5,
    start: { r: 0, c: 0 },
    goal: { r: 3, c: 3 },
    obstacles: [],
    expectedPathLength: 6
  },
  TEST_CASE_2: {
    id: 2,
    name: "Test Case 2: Obstacle Detour",
    description: "5×5 grid with Start at (0,0) and Goal at (4,4). Column 2 is blocked except at (2,2).",
    gridSize: 5,
    start: { r: 0, c: 0 },
    goal: { r: 4, c: 4 },
    // Obstacles at (0,2), (1,2), (3,2), (4,2) — leaving (2,2) clear
    obstacles: ["0,2", "1,2", "3,2", "4,2"],
    expectedPathLength: 8
  }
};
