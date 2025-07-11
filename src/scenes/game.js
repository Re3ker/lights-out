import { createBoard, randomizeBoard, toggleLights, isGameWon, solveBoard } from "../utils/gameLogic";

export default function game(k) {
  // Define layers
  k.layers(["background", "game", "ui"], "game");

  const SIZE = 5;
  const CELL_SIZE = 80;
  const GAP = 10;
  let board = createBoard();
  let moves = 0;
  let isBotPlaying = false;

  // Add background
  k.add([
    k.sprite("background"),
    k.pos(0, 0),
    k.layer("background"),
    k.scale(k.width() / 800),
  ]);

  // Randomize the board
  board = randomizeBoard(board);

  // Create the grid
  const grid = Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(null));

  // Calculate starting position to center the grid
  const startX = (k.width() - (SIZE * (CELL_SIZE + GAP) - GAP)) / 2;
  const startY = (k.height() - (SIZE * (CELL_SIZE + GAP) - GAP)) / 2;

  // Display move count
  const moveText = k.add([
    k.text(`Moves: ${moves}`, { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.anchor("center"),
    k.layer("ui"),
  ]);

  // Create the grid of sprites
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const x = startX + j * (CELL_SIZE + GAP);
      const y = startY + i * (CELL_SIZE + GAP);
      grid[i][j] = k.add([
        k.sprite(board[i][j] ? "light-on" : "light-off"),
        k.pos(x, y),
        k.area({ width: CELL_SIZE, height: CELL_SIZE }),
        k.scale(CELL_SIZE / 1024), // Scale to fit the cell size
        k.anchor("topleft"),
        k.layer("game"),
        {
          row: i,
          col: j,
        },
      ]);
    }
  }

  // Function to handle a single move (used by both player and bot)
  function makeMove(row, col) {
    board = toggleLights(board, row, col);
    moves++;

    // Play sound based on the new state of the clicked cell
    k.play(board[row][col] ? "sound-on" : "sound-off");

    // Update visuals
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        grid[x][y].use(board[x][y] ? k.sprite("light-on") : k.sprite("light-off"));
        grid[x][y].use(k.area({ width: CELL_SIZE, height: CELL_SIZE }));
      }
    }

    // Update move count
    moveText.text = `Moves: ${moves}`;

    // Check for win
    if (isGameWon(board)) {
      k.go("gameOver", moves);
      isBotPlaying = false;
    }
  }

  // Handle player clicks on the grid
  k.onMousePress("left", () => {
    if (isBotPlaying) return;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const cell = grid[i][j];
        if (cell.isHovering()) {
          console.log(`Clicked cell at row ${i}, col ${j}`);
          makeMove(i, j);
          break;
        }
      }
    }
  });

  // Handle AI bot activation with 'K' key
  k.onKeyPress("k", () => {
    if (isBotPlaying) return;
    isBotPlaying = true;
    const movesList = solveBoard(board);
    console.log("AI bot moves:", movesList);

    let moveIndex = 0;
    function playNextMove() {
      if (moveIndex >= movesList.length || !isBotPlaying) {
        isBotPlaying = false;
        return;
      }
      const [row, col] = movesList[moveIndex];
      console.log(`Bot toggling cell at row ${row}, col ${col}`);
      makeMove(row, col);
      moveIndex++;
      k.wait(0.5, playNextMove);
    }

    playNextMove();
  });
}
