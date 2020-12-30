const express = require('express');
const app = express();
const port = 3008;

const yaml = require('js-yaml');
const fetch = require('node-fetch');

const revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim();

app.get('/', (req, res) => {
    res.send('/:map_id')
});

async function get(url) {
    return fetch(url).then(response => {
        return response.text();
    });
}

app.use(express.static(__dirname + '/../'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:map', async (req, res) => {
    const mapId = req.params.map;

    if(isNaN(mapId)) return res.send('No.');

    const resp = await get('https://api.quavergame.com/d/web/map/' + mapId);
    return res.render('../index.html', {revision: revision, mapId: mapId, resp: JSON.stringify(yaml.safeLoad(resp))});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})