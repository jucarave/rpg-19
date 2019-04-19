import Entity from "engine/world/Entity";
import Texture from "engine/Texture";
import Image from "engine/geometries/Image";
import Renderer from "engine/Renderer";

const testMap = [
   [  5,  1,  3,  4,  1,  1,  1, 36,  1,  1,  1,  1,  3,  6,  8,  1 ],
   [  1,  7,  2,  1,  1,  1, 43, 44,  1,  4,  1,  1, 35,  5,  1,  1 ],
   [  1,  1,  1,  1,  1,  2,  1,  1,  4,  5,  1,  9,  1,  1,  1,  1 ],
   [  1,  2,  1,  1,  1,  8,  1,  1,  1,  1,  1,  7, 21, 17, 17, 17 ],
   [ 17, 18, 17, 17, 17, 17, 27, 28, 17, 17, 17, 17, 23, 25, 26, 25 ],
   [ 25, 25, 25, 25, 25, 25, 26, 25, 25, 25, 25, 25, 19,  1,  3,  1 ],
   [  1,  1,  8,  1,  1,  4,  1,  1,  6,  1,  1,  1,  1,  1,  2,  1 ],
   [  1,  6,  1,  1,  9,  1,  1,  1, 37, 38, 39,  1,  3,  6,  1,  1 ],
   [  4,  2, 35,  1,  1,  1,  7,  5, 45,  1, 45,  4,  8,  5,  9,  1 ],
];

class MapLoader {
    public static loadMap(tileset: Texture, renderer: Renderer): Entity {
        const sprite = new Image(tileset, renderer).setGridSize(32);
        const entity = new Entity(0, 0, sprite);

        for (let y=0;y<testMap.length;y++) {
            for (let x=0;x<testMap[y].length;x++) {
                const tile = testMap[y][x] - 1;
                const indX = (tile % tileset.tileSize[0]);
                const indY = Math.floor(tile / tileset.tileSize[0]);

                sprite.addTile(x, y, indX, indY);
            }
        }

        sprite.build();

        return entity;
    }
}

export default MapLoader;