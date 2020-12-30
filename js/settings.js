// Global settings

let borderSize = 2, scrollSpeed = 12, spacing = 3;

const noteSize = {
    width: 512 / 4,
    height: 192 / 4
}

const positions = {
    lane1: borderSize,
    lane2: noteSize.width,
    lane3: (noteSize.width * 2) - borderSize,
    lane4: (noteSize.width * 3) - (borderSize * 2)
}