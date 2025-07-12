export default function mainMenu(k) {
    k.add([
        k.sprite("background"),
        k.pos(0, 0),
        k.layer("background"),
        k.scale(k.width() / 720),
    ]);

    k.add([
        k.text("Lights Out", { font: "pixel", size: 100 }),
        k.pos(k.width() / 2, k.height() / 3),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Click or Tap to Start", { font: "pixel", size: 32 }),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
    ]);

    k.onMousePress("left", () => {
        k.go("game");
    });
}
