document.addEventListener("DOMContentLoaded", function (event) {
    PIXI.utils.skipHello();

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

    // Notes container
    const notes = new PIXI.Container();

    // Load all notes
    for (let object of doc.HitObjects) {
        const start = (object.StartTime);
        // Check if note is long
        if(object.EndTime !== undefined) {
            const end = object.EndTime;
            const longNote = drawLongNote(object.Lane, positions['lane' + (5 - object.Lane)], start, end);
            notes.addChild(longNote);
        } else {
            const note = drawNote(object.Lane, positions['lane' + (5 - object.Lane)], start);
            notes.addChild(note);
        }
    }

    playField.addChild(notes);
    app.stage.addChild(playField);

    let hPosition = 0;

    // Move container to start time
    notes.y += doc.TimingPoints[0].StartTime;

    app.ticker.add((delta) => {
        if(hPosition >= notes.height) {
            app.ticker.stop();
        }

        hPosition += scrollSpeed * delta;

        notes.y -= scrollSpeed * delta;
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