import Entity from "engine/world/Entity";
import Texture from "engine/Texture";
import Image from "engine/geometries/Image";
import Renderer from "engine/Renderer";

const testMap = [
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 13,  9,  9,  9 ],
   [  9, 10,  9,  9,  9,  9, 19, 20,  9,  9,  9,  9, 15, 17, 17, 17 ],
   [ 17, 17, 17, 17, 17, 17, 18, 17, 17, 17, 17, 17, 11,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
   [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
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