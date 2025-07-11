export default function mainMenu(k) {
  k.add([
    k.text("Lights Out", { size: 48 }),
    k.pos(k.width() / 2, k.height() / 3),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Press Enter to Start", { size: 24 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ]);

  k.onKeyPress("enter", () => {
    k.go("game");
  });
}
