const fs = require('fs');
const path = require('path');

module.exports = {
    loadMap: function(x, y, w, h) {
        let maps = [];

        for (let i=0;i<w;i++) {
            for (let j=0;j<h;j++) {
                const filename = path.resolve(__dirname + `/../data/map${i}_${j}.json`);
                
                if (fs.existsSync(filename)) {
                    maps.push(JSON.parse(fs.readFileSync(filename)));
                }
            }
        }
        return { maps };
    }
};