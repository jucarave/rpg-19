import Entity from "engine/world/Entity";
import Texture from "engine/Texture";
import Image from "engine/geometries/Image";
import Renderer from "engine/Renderer";
import Scene from "engine/world/Scene";
import WorldItems from "./WorldItems";
import WorldDetailComponent from "components/WorldDetailComponent";
import { GRID_SIZE } from "./Constants";

const testMap = [1, 1, 1, 1, 1, 1, 1, 36, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 3, 8, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 8, 1, 1, 1, 43, 44, 1, 1, 1, 3, 2, 1, 1, 1, 1, 6, 1, 2, 1, 1, 1, 1, 5, 2, 1, 1, 1, 8, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 8, 7, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 35, 1, 1, 1, 4, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 2, 6, 1, 3, 9, 1, 1, 1, 1, 2, 6, 1, 1, 1, 4, 1, 6, 3, 1, 2, 1, 3, 1, 1, 1, 35, 8, 1, 9, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 8, 3, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 27, 28, 17, 17, 17, 17, 17, 23, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 19, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 4, 1, 2, 6, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 4, 1, 1, 1, 5, 8, 7, 1, 1, 1, 8, 8, 1, 5, 1, 3, 2, 4, 1, 1, 37, 38, 38, 38, 38, 39, 1, 1, 1, 3, 1, 5, 6, 1, 1, 2, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 6, 4, 1, 1, 1, 45, 1, 6, 1, 1, 45, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1, 2, 3, 1, 1, 43, 38, 38, 38, 38, 38, 38, 38, 44, 1, 2, 1, 43, 44, 1, 35, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 2, 3, 1, 6, 1, 4, 1, 3, 2, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 2, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 8, 4, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 4, 1, 1, 1, 1, 1, 4, 8, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 9, 2, 4, 1, 1, 1, 1, 36, 1, 1, 35, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 8, 1, 1, 1, 8, 6, 1, 1, 1, 1, 1, 1, 1, 1, 4, 45, 1, 2, 3, 1, 1, 1, 2, 8, 1, 1, 1, 2, 3, 1, 1, 7, 4, 1, 1, 1, 3, 4, 1, 1, 1, 1, 1, 1, 1, 3, 1, 45, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4, 1, 1, 1, 2, 3, 45, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 4, 1, 1, 1, 1, 5, 8, 1, 4, 1, 1, 1, 3, 2, 1, 1, 7, 1, 1, 1, 1, 45, 4, 1, 1, 1, 1, 1, 1, 6, 1, 2, 8, 6, 1, 1, 8, 2, 3, 1, 1, 1, 9, 1, 1, 8, 1, 1, 1, 2, 1, 1, 43, 44, 1, 1, 4, 1, 2, 1, 6, 6, 1, 1, 2, 1, 1, 5, 1, 4, 8, 1, 1, 2, 1, 1, 4, 35, 4, 1, 1, 1, 1, 1, 1, 1, 6, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 35, 1, 21, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 1, 1, 1, 43, 39, 1, 1, 1, 1, 1, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 1, 1, 1, 43, 44, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 6, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 7, 1, 1, 1, 1, 8, 1, 1, 4, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 9, 8, 1, 1, 1, 1, 4, 1, 1, 6, 2, 3, 1, 1, 1, 4, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 35, 1, 1, 1, 2, 4, 1, 1, 1, 6, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 4, 7, 1, 1, 1, 1, 1, 8, 8, 1, 35, 1, 1, 1, 9, 1, 3, 8, 1, 1, 1, 1, 6, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 8, 2, 1, 3, 1, 1, 1, 2, 3, 1, 1, 1, 1, 2, 3, 8, 1, 1, 6, 2, 1, 1, 1, 9, 1, 1, 1, 1, 4, 1, 1, 1, 6, 2, 7, 2, 6, 1, 1, 8, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const MAP_SIZE = 32;

const details = [
    {x: 1, y: 2, type: 1},
    {x: 23, y: 2, type: 1},
    {x: 17, y: 8, type: 1},
    {x: 24, y: 12, type: 1},
    {x: 5, y: 17, type: 1},
    {x: 29, y: 18, type: 1},
    {x: 15, y: 22, type: 1},
    {x: 0, y: 24, type: 1},
    {x: 27, y: 28, type: 1},
    {x: 8, y: 30, type: 1}
];

class MapLoader {
    public static loadMap(scene: Scene, renderer: Renderer): void {
        const tileset = Texture.getTexture("tileset");
        const sprite = new Image(tileset, renderer).setGridSize(GRID_SIZE);
        const entity = new Entity("WorldMap", 0, 0, sprite);

        for (let y=0;y<MAP_SIZE;y++) {
            for (let x=0;x<MAP_SIZE;x++) {
                const ind = y * MAP_SIZE + x;
                const tile = testMap[ind] - 1;
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

            const x = (detail.x + 0.5) * GRID_SIZE;
            const y = (detail.y + 0.5) * GRID_SIZE;

            const sprite = new Image(tex, renderer);
            sprite.addSprite(x, y, data.size[0], data.size[1], { v2Pivot: data.pivot, v4UVs: data.uvs });
            sprite.build();
            
            worldDetailComponent.addImage([x, y], sprite);
        }
    }
}

export default MapLoader;