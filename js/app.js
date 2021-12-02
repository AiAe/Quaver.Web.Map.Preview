document.addEventListener("DOMContentLoaded", function (event) {
    PIXI.utils.skipHello();

    let app = new PIXI.Application({
        width: (noteSize.width * numLanes) - (borderSize * 2),
        height: window.innerHeight,
        transparent: true,
        type: (!PIXI.utils.isWebGLSupported()) ? "canvas" : "WebGL"
    });

    document.querySelector("#quaver").appendChild(app.view);

    // Vars
    let hPosition = 0, started = true, oldY = 0, moving = true;

    // Create play field container and draw it
    const playField = new PIXI.Container();
    playField.addChild(drawPlayField());

    // Draw field borders
    for (let i = 0; i <= numLanes; i++) {
        playField.addChild(drawPlayFieldBorders(i * (noteSize.width - borderSize), 0));
    }

    // Notes container
    const notes = new PIXI.Container();

    // Load all notes
    for (let object of doc.HitObjects) {
        const start = (object.StartTime) * spacing;
        // Check if note is long
        if (object.EndTime !== undefined) {
            const end = object.EndTime * spacing;
            const longNote = drawLongNote(object.Lane, positions['lane' + ((numLanes + 1) - object.Lane)], start, end);
            notes.addChild(longNote);
        } else {
            const note = drawNote(object.Lane, positions['lane' + ((numLanes + 1) - object.Lane)], start);
            notes.addChild(note);
        }
    }

    playField.addChild(notes);
    app.stage.addChild(playField);

    // Move container to start time
    notes.y += doc.TimingPoints[0].StartTime;

    app.ticker.add((delta) => {
        if (started && moving) {
            hPosition += scrollSpeed * delta;
            notes.y -= scrollSpeed * delta;
            line.style.top = Math.abs(notes.y) / scrollableContainer + "px";
        }
    });

    document.addEventListener('mousemove', event => {
        if (!moving) {
            if (event.pageY < oldY) {
                notes.y += 10;
            } else if (event.pageY > oldY) {
                notes.y -= 10;
            }
        }
        oldY = window.innerHeight - event.pageY;
    });

    let ignore = false;

    document.addEventListener('keydown', function (key) {
        if(ignore) return;
        switch (key.code) {
            case "Space":
                started = !started;
                break;
            case "F3":
                scrollSpeed -= 1;
                break;
            case "F4":
                scrollSpeed += 1;
                break;
            case "F5":
                location.reload();
                break;
            case "ArrowUp":
                notes.y += 100;
                break;
            case "ArrowDown":
                notes.y -= 100;
                break;
        }
        key.preventDefault();
    });

    const bar = document.querySelector('#bar');
    const line = document.querySelector('#line');
    const scrollableContainer = notes.height / bar.clientHeight;

    bar.addEventListener('click', event => {
        ignore = true;
        line.style.top = oldY + "px";

        const scrollTo = scrollableContainer * oldY;

        notes.y = -scrollTo;
        ignore = false;
    });
});