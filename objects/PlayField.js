function drawPlayField() {
    const fieldWidth = (noteSize.width - borderSize) * numLanes;
    let draw = new PIXI.Graphics();
    draw.beginFill(0x000000);
    draw.drawRect(0, 0, fieldWidth, window.innerHeight);
    draw.endFill();
    return draw;
}