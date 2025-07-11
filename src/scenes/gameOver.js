export default function gameOver(k, moves) {
  k.canvas.focus();
  console.log("Game over scene loaded");

  k.add([
    k.text("You Win!", { size: 48 }),
    k.pos(k.width() / 2, k.height() / 3),
    k.anchor("center"),
  ]);

  k.add([
    k.text(`Moves: ${moves}`, { size: 24 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Click or Tap to Restart", { size: 24 }),
    k.pos(k.width() / 2, k.height() * 2 / 3),
    k.anchor("center"),
  ]);

  const clickableArea = k.add([
    k.rect(k.width(), k.height()),
    k.pos(0, 0),
    k.area(),
    k.opacity(0),
  ]);

  const mouseHandler = k.onMousePress("left", () => {
    console.log("Game over: Mouse clicked");
    k.go("game");
  });

  const touchHandler = k.onTouchStart((id, pos) => {
    console.log("Game over: Touch started at", pos);
    k.go("game");
  });

  clickableArea.onClick(() => {
    console.log("Game over: Clickable area clicked");
    k.go("game");
  });

  k.onDestroy(() => {
    console.log("Game over scene destroyed, cleaning up handlers");
    mouseHandler.cancel();
    touchHandler.cancel();
  });
}
