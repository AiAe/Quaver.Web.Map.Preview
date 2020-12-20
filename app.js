document.addEventListener("DOMContentLoaded", function (event) {
    let app = new PIXI.Application({
        width: (noteSize.width * 4) - (borderSize * 2),
        height: window.innerHeight,
        transparent: true,
        type: (!PIXI.utils.isWebGLSupported()) ? "canvas" : "WebGL"
    });

    document.body.appendChild(app.view);

    // Create play field container and draw it
    const playField = new PIXI.Container();
    playField.addChild(drawPlayField());

    // Draw field borders
    playField.addChild(drawPlayFieldBorders(0, 0));
    playField.addChild(drawPlayFieldBorders((noteSize.width) - borderSize, 0));
    playField.addChild(drawPlayFieldBorders((noteSize.width * 2) - (borderSize * 2), 0));
    playField.addChild(drawPlayFieldBorders((noteSize.width * 3) - (borderSize * 3), 0));
    playField.addChild(drawPlayFieldBorders((noteSize.width * 4) - (borderSize * 4), 0));

    let notes = [];

    // Load all notes
    for (let object of doc.HitObjects) {
        const start = (object.StartTime) * spacing;
        // Check if note is long
        if(object.EndTime !== undefined) {
            const end = object.EndTime  * spacing;
            const longNote = drawLongNote(object.Lane, positions['lane' + object.Lane], start, end);
            longNote.visible = false;
            notes.push(longNote);
            playField.addChild(longNote);
        } else {
            const note = drawNote(object.Lane, positions['lane' + object.Lane], start);
            note.visible = false;
            notes.push(note);
            playField.addChild(note);
        }
    }

    app.stage.addChild(playField);

    const stopAt = playField.children.length - notes.length;

    app.ticker.add((delta) => {
        if(playField.children.length <= stopAt) {
            app.ticker.stop();
        }
        for(note of notes) {
            // Render only visible notes
            if(note.y < window.innerHeight) note.visible = true;
            // Delete object when it goes offscreen
            if(note.y < 0 - note.height) {
                playField.removeChild(note);
            } else {
                note.y -= scrollSpeed * delta;
            }
        }
    });

    let started = true;

    document.addEventListener('keydown', function (key) {
        if(key.code === "Space") {
            if(started) {
                app.ticker.stop();
            }
            else app.ticker.start();
            started = !started;
        }
    });
});