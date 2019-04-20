import Entity from "engine/world/Entity";
import Texture from "engine/Texture";
import Image from "engine/geometries/Image";
import Renderer from "engine/Renderer";
import Scene from "engine/world/Scene";
import WorldItems from "./WorldItems";
import WorldDetailComponent from "components/WorldDetailComponent";

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

const details = [
    {x: 1, y: 0, type: 1},
    {x: 10, y: 3, type: 1},
    {x: 14, y: 7, type: 1},
    {x: 1, y: 10, type: 1}
];

class MapLoader {
    public static loadMap(tileset: Texture, scene: Scene, renderer: Renderer): void {
        const sprite = new Image(tileset, renderer).setGridSize(32);
        const entity = new Entity("WorldMap", 0, 0, sprite);

        for (let y=0;y<testMap.length;y++) {
            for (let x=0;x<testMap[y].length;x++) {
                const tile = testMap[y][x] - 1;
                const indX = (tile % tileset.tileSize[0]);
                const indY = Math.floor(tile / tileset.tileSize[0]);

                sprite.addTile(x, y, indX, indY);
            }
        }

        sprite.build();

        const worldDetailComponent = new WorldDetailComponent();
        entity.addComponent(worldDetailComponent);

        scene.addEntity(entity, "Background");

        // Foreground
        const tex = Texture.getTexture("worldItems");

        for (let i=0;i<details.length;i++) {
            const detail = details[i];
            const data = WorldItems[detail.type];

            if (!data) { throw new Error("Cannot find World Item [" + detail.type + "]"); }

            const sprite = new Image(tex, renderer);
            sprite.addSprite( (detail.x+0.5)*32, (detail.y+0.5)*32, data.size[0], data.size[1], { v2Pivot: data.pivot, v4UVs: data.uvs });
            sprite.build();
            
            worldDetailComponent.addImage([(detail.x+0.5)*32, (detail.y+0.5)*32], sprite);
        }
    }
}

export default MapLoader;