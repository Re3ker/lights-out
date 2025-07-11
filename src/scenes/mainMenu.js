export default function mainMenu(k) {
  k.add([
    k.text("Lights Out", { size: 48 }),
    k.pos(k.width() / 2, k.height() / 3),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Click or Tap to Start", { size: 24 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ]);

  k.onMousePress("left", () => {
    k.go("game");
  });
}
