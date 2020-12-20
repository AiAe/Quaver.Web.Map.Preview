function drawLongNote(lane, x, y, yEnd) {
    let noteHoldStart, noteHoldBody, NoteHoldEnd;
    if (lane === 1 || lane === 4) {
        noteHoldStart = "note-holdstart-1.png";
        noteHoldBody = "note-holdbody-1.png";
        NoteHoldEnd = "note-holdend-1.png";
    } else {
        noteHoldStart = "note-holdstart-2.png";
        noteHoldBody = "note-holdbody-2.png";
        NoteHoldEnd = "note-holdend-2.png";
    }

    const container = new PIXI.Container();

    const end = new PIXI.Sprite.from('skin/longnote/' + noteHoldStart);
    const body = new PIXI.Sprite.from('skin/longnote/' + noteHoldBody);
    const start = new PIXI.Sprite.from('skin/longnote/' + NoteHoldEnd);

    end.width = noteSize.width - (borderSize * 2)
    end.height = noteSize.height;
    end.y = yEnd - y;

    body.width = noteSize.width - (borderSize * 2)
    body.height = yEnd - y - noteSize.height;
    body.y = noteSize.height;
    body.alpha = longNoteAlpha;

    start.width = noteSize.width - (borderSize * 2)
    start.height = noteSize.height;

    container.addChild(start);
    container.addChild(body);
    container.addChild(end);

    container.x = x;
    container.y = y;

    return container;
}