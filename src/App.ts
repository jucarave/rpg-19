import Renderer from './engine/Renderer';
import Image from 'engine/geometries/Image';
import Texture from 'engine/Texture';
import Entity from 'engine/world/Entity';
import Scene from 'engine/world/Scene';
import PlayerComponent from 'components/PlayerComponent';
import CharacterComponent from 'components/CharacterComponent';
import MapLoader from 'data/MapLoader';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        Texture.loadTexture("characters", "img/characters.png", this._renderer.GL);
        Texture.loadTexture("worldItems", "img/worldItems.png", this._renderer.GL);
        Texture.loadTexture("tileset", "img/tileset.png", this._renderer.GL).loadTiles(8, 8, 32);

        this._loading();
    }

    private _loading(): void {
        if (!Texture.areTexturesReady()) {
            requestAnimationFrame(() => { this._loading(); });
            return;
        }

        this._createScene();
    }

    private _createScene(): void {
        // Create scene
        const texture = Texture.getTexture("characters");
        const sprite = new Image(texture, this._renderer).createSprite(32.0, 64.0, { v2Pivot: [16.0, 64.0], v4UVs: [0.0, 0.0, 32.0, 64.0] });
        const entity = new Entity(0, 0, sprite);

        entity.addComponent(new CharacterComponent());
        entity.addComponent(new PlayerComponent());

        const scene = new Scene();
        scene.camera.position.set(8*32, 4.5*32);

        scene.addLayer("Background");
        scene.addLayer("Entities");
        scene.addLayer("Foreground");
        
        scene.addEntity(entity, "Entities");

        // Tileset
        const tileTex = Texture.getTexture("tileset");
        MapLoader.loadMap(tileTex, scene, this._renderer);

        // Draw scene
        this._renderScene(scene);
    }

    private _renderScene(scene: Scene): void {
        this._renderer.update();
        this._renderer.clear();

        scene.update();
        scene.render();

        requestAnimationFrame(() => {
            this._renderScene(scene);
        });
    }
}

window.onload = () => {
    new App();
};