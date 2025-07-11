import kaplay from "kaplay";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";

// Initialize Kaplay
const k = kaplay({
  width: 720,
  height: 1280,
  background: [0, 0, 0],
  touchToMouse: true,
  letterbox: true,
  debug: true,
  pixelDensity: devicePixelRatio
});

k.setLayers(["background", "game", "ui"], "game");

// Ensure canvas is focused
k.canvas.focus();

// Load sprite images
k.loadSprite("light-on", "/lights-out/assets/on.jpg");
k.loadSprite("light-off", "/lights-out/assets/off.jpg");
k.loadSprite("background", "/lights-out/assets/background.jpg");

// Load sound effects
k.loadSound("sound-on", "/lights-out/assets/on.wav");
k.loadSound("sound-off", "/lights-out/assets/off.wav");

// Register scenes
k.scene("mainMenu", () => mainMenu(k));
k.scene("game", () => game(k));
k.scene("gameOver", (moves) => gameOver(k, moves));

// Start with the main menu
k.go("mainMenu");
