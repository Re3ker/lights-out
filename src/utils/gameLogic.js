export function createBoard() {
  const size = 5;
  const board = Array(size)
    .fill()
    .map(() => Array(size).fill(false));
  return board;
}

export function randomizeBoard(board) {
  const size = 5;
  // Start with an all-off board
  const tempBoard = createBoard();

  // Simulate 5–15 random clicks
  const numClicks = Math.floor(Math.random() * 11) + 5; // Random number between 5 and 15
  for (let i = 0; i < numClicks; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    toggleLights(tempBoard, row, col);
  }

  // Copy the randomized board back to the input board
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[i][j] = tempBoard[i][j];
    }
  }
  return board;
}

export function toggleLights(board, row, col) {
  const size = 5;
  const directions = [
    [0, 0], // Self
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
      board[newRow][newCol] = !board[newRow][newCol];
    }
  }
  return board;
}

export function isGameWon(board) {
  return board.every(row => row.every(cell => !cell));
}

export function solveBoard(board) {
  const size = 5;
  const n = size * size; // 25 cells
  // Create the adjacency matrix A (25x25) and state vector b (25x1)
  const A = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  const b = Array(n).fill(0);

  // Fill the state vector b (flattened board)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      b[i * size + j] = board[i][j] ? 1 : 0;
    }
  }

  // Fill the adjacency matrix A
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cellIdx = i * size + j;
      const directions = [
        [0, 0], // Self
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
      ];
      for (const [dr, dc] of directions) {
        const r = i + dr;
        const c = j + dc;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          A[cellIdx][r * size + c] = 1; // Toggle affects this cell
        }
      }
    }
  }

  // Gaussian elimination over GF(2)
  const x = Array(n).fill(0); // Solution vector
  for (let i = 0; i < n; i++) {
    // Find pivot
    let pivot = i;
    while (pivot < n && A[pivot][i] === 0) pivot++;
    if (pivot === n) continue; // No pivot, skip (implies free variable)

    // Swap rows if necessary
    if (pivot !== i) {
      [A[i], A[pivot]] = [A[pivot], A[i]];
      [b[i], b[pivot]] = [b[pivot], b[i]];
    }

    // Eliminate column
    for (let j = 0; j < n; j++) {
      if (j !== i && A[j][i] === 1) {
        for (let k = 0; k < n; k++) {
          A[j][k] = (A[j][k] + A[i][k]) % 2; // XOR
        }
        b[j] = (b[j] + b[i]) % 2; // XOR
      }
    }
  }

  // Back-substitution
  for (let i = n - 1; i >= 0; i--) {
    if (A[i][i] === 1) {
      x[i] = b[i];
      for (let j = i - 1; j >= 0; j--) {
        if (A[j][i] === 1) {
          b[j] = (b[j] + x[i]) % 2; // Update b for upper rows
        }
      }
    }
  }

  // Convert solution vector to move list
  const moves = [];
  for (let i = 0; i < n; i++) {
    if (x[i] === 1) {
      const row = Math.floor(i / size);
      const col = i % size;
      moves.push([row, col]);
    }
  }

  return moves;
}
