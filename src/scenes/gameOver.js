export default function gameOver(k, moves) {
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
    k.text("Press Enter to Restart", { size: 24 }),
    k.pos(k.width() / 2, k.height() * 2 / 3),
    k.anchor("center"),
  ]);

  k.onKeyPress("enter", () => {
    k.go("game");
  });
}
