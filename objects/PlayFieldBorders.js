function drawPlayFieldBorders(x, y) {
    let line = new PIXI.Graphics();
    line.lineStyle(borderSize, 0xFFFFFF, 1, 1);
    line.moveTo(0, 0);
    line.lineTo(0, window.innerHeight);
    line.x = x;
    line.y = y;
    return line;
}