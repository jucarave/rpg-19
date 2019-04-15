import Renderer from './engine/Renderer';
import Sprite from 'engine/geometries/Sprite';
import Texture from 'engine/Texture';
import Entity from 'engine/Entity';
import Scene from 'engine/Scene';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        Texture.loadTexture("characters", "img/characters.png", this._renderer.GL);

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
        // Create triangle
        const texture = Texture.getTexture("characters");
        const sprite = new Sprite(32.0, 64.0, texture, this._renderer, { v2Pivot: [16.0, 64.0], v4UVs: [0.0, 0.0, 32.0, 64.0] });
        const entity = new Entity(0, 0, sprite);

        const scene = new Scene();
        
        scene.addLayer("Entities");
        scene.addEntity(entity, "Entities");

        // Draw triangle
        this._renderTriangle(scene);
    }

    private _renderTriangle(scene: Scene): void {
        this._renderer.clear();

        scene.update();
        scene.render();

        requestAnimationFrame(() => {
            this._renderTriangle(scene);
        });
    }
}

window.onload = () => {
    new App();
};