const express = require('express');
const path = require('path');
const loadMap = require('./api/LoadMap');

const app = express();

app.get('/api/loadMap', (req, res) => {
    const x = parseInt(req.query.x || 0);
    const y = parseInt(req.query.y || 0);
    const w = parseInt(req.query.w || 1);
    const h = parseInt(req.query.h || 1);

    res.send(loadMap.loadMap(x, y, w, h));
});

app.get('/*', (req, res) => {
    let urlPath = req.path;
    if (urlPath === "/") { urlPath = "/index.html"; }

    res.sendFile(path.resolve(app.get('appPath') + '/../../dist/' + urlPath));
});

app.listen(3333, () => {
    console.log('App listening on port 3333');
});