function drawNote(lane, x, y) {
    let hitObject = "";
    if (lane === 1 || lane === 4) {
        hitObject = "note-hitobject-1.png";
    } else {
        hitObject = "note-hitobject-2.png";
    }
    const note = PIXI.Sprite.from('skin/notes/' + hitObject);

    note.width = noteSize.width - (borderSize * 2);
    note.height = noteSize.height;
    note.x = x;
    note.y = y;

    return note;
}