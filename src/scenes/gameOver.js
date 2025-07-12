export default function gameOver(k, moves) {
    k.canvas.focus();

    k.add([
        k.sprite("background"),
        k.pos(0, 0),
        k.layer("background"),
        k.scale(k.width() / 720),
    ]);

    k.add([
        k.text("You Win!", { font: "pixel", size: 100 }),
        k.pos(k.width() / 2, k.height() / 3),
        k.anchor("center"),
    ]);

    k.add([
        k.text(`Moves: ${moves}`, { font: "pixel", size: 64 }),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Click or Tap to Restart", { font: "pixel", size: 32 }),
        k.pos(k.width() / 2, (k.height() * 2) / 3),
        k.anchor("center"),
    ]);

    const clickableArea = k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.area(),
        k.opacity(0),
    ]);

    const mouseHandler = k.onMousePress("left", () => {
        k.go("game");
    });

    const touchHandler = k.onTouchStart((id, pos) => {
        k.go("game");
    });

    clickableArea.onClick(() => {
        k.go("game");
    });

    k.onDestroy(() => {
        mouseHandler.cancel();
        touchHandler.cancel();
    });
}
