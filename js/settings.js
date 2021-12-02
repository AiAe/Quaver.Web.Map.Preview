// Global settings

let borderSize = 2, scrollSpeed = 12, spacing = 3;
const numLanes = parseInt(doc.Mode.replace(/Keys/, ''));

const noteSize = {
    width: 512 / numLanes,
    height: 192 / numLanes
}

const positions = {
    lane1: borderSize,
    lane2: noteSize.width,
    lane3: (noteSize.width * 2) - borderSize,
    lane4: (noteSize.width * 3) - (borderSize * 2),
    lane5: (noteSize.width * 4) - (borderSize * 3),
    lane6: (noteSize.width * 5) - (borderSize * 4),
    lane7: (noteSize.width * 6) - (borderSize * 5)
}