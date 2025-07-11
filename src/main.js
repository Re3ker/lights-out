import kaplay from "kaplay";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";

// Initialize Kaplay
const k = kaplay({
  width: 800,
  height: 600,
  background: [0, 0, 0],
});

// Ensure canvas is focused
k.canvas.focus();

// Load sprite images
k.loadSprite("light-on", "/assets/on.jpg");
k.loadSprite("light-off", "/assets/off.jpg");
k.loadSprite("background", "/assets/background.jpg");

// Load sound effects
k.loadSound("sound-on", "/assets/on.wav");
k.loadSound("sound-off", "/assets/off.wav");

// Register scenes
k.scene("mainMenu", () => mainMenu(k));
k.scene("game", () => game(k));
k.scene("gameOver", (moves) => gameOver(k, moves));

// Start with the main menu
k.go("mainMenu");
