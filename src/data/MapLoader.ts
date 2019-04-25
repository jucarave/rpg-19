import Entity from "engine/world/Entity";
import Texture from "engine/Texture";
import Image from "engine/geometries/Image";
import Renderer from "engine/Renderer";
import Scene from "engine/world/Scene";
import WorldItems from "./WorldItems";
import WorldDetail from "components/WorldDetail";
import { GRID_SIZE } from "./Constants";
import WorldMap from "components/WorldMap";
import { loadJSON } from "engine/Utilts";

const MAP_SIZE = 64;

class MapLoader {
    public static loadMap(scene: Scene, renderer: Renderer): void {
        //const maps = [GetMap0_0, GetMap1_0];

        const entity = new Entity("WorldMap", 0, 0, null);
        const worldMap = new WorldMap(2, 1);
        renderer;
        entity.addComponent(worldMap);
        scene.addEntity(entity, "Background");

        const foregroundTex = Texture.getTexture("worldItems");

        loadJSON(`/api/loadMap?x=0&y=0&w=2&h=1`, (response: any) => {
            const maps = response.maps;

            for (let j=0;j<maps.length;j++) {
                const tileset = Texture.getTexture("tileset");
                const sprite = new Image(tileset, renderer).setGridSize(GRID_SIZE);
                const map = maps[j];
                const entityMap = new Entity(`WorldMap_${map.x}_${map.y}`, MAP_SIZE * GRID_SIZE * j, 0, sprite);
    
                for (let y=0;y<MAP_SIZE;y++) {
                    for (let x=0;x<MAP_SIZE;x++) {
                        const ind = y * MAP_SIZE + x;
                        const tile = map.map[ind] - 1;
                        const indX = (tile % tileset.tileSize[0]);
                        const indY = Math.floor(tile / tileset.tileSize[0]);
    
                        sprite.addTile(x, y, indX, indY);
                    }
                }
    
                sprite.build();
                worldMap.addSolidMap(map.x, map.y, map.solidMap, entityMap);
    
                const worldDetailComponent = new WorldDetail();
                entityMap.addComponent(worldDetailComponent);
                
                // Foreground
                for (let i=0;i<map.details.length;i++) {
                    const detail = map.details[i];
                    const data = WorldItems[detail.type];
    
                    if (!data) { throw new Error("Cannot find World Item [" + detail.type + "]"); }

                    const x = (detail.x + 0.5) * GRID_SIZE;
                    const y = (detail.y + 0.5) * GRID_SIZE;

                    const sprite = new Image(foregroundTex, renderer);
                    sprite.addSprite(x, y, data.size[0], data.size[1], { v2Pivot: data.pivot, v4UVs: data.uvs });
                    sprite.build();
                    
                    worldDetailComponent.addImage([x, y], sprite);
                }

                scene.addEntity(entityMap, "Background");
            }
        });
    }
}

export default MapLoader;