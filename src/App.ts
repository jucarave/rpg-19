import Renderer from './engine/Renderer';
import Sprite from 'engine/geometries/Sprite';
import Camera from 'engine/Camera';
import Texture from 'engine/Texture';
import Entity from 'engine/Entity';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        Texture.loadTexture("characters", "img/characters.png", this._renderer.GL);

        const wait = () => {
            if (!Texture.areTexturesReady()) {
                requestAnimationFrame(() => { wait(); });
                return;
            }

            this._createTriangle();
        };
        
        wait();
    }

    private _createTriangle(): void {
        // Create triangle
        const texture = Texture.getTexture("characters");
        const sprite = new Sprite(32.0, 64.0, texture, this._renderer, { v2Pivot: [16.0, 64.0], v4UVs: [0.0, 0.0, 32.0, 64.0] });
        const entity = new Entity(0, 0, sprite);

        const camera = new Camera();

        // Draw triangle
        this._renderTriangle(entity, sprite, camera);
    }

    private _renderTriangle(entity: Entity, sprite: Sprite, camera: Camera): void {
        this._renderer.clear();

        entity.render(camera);

        requestAnimationFrame(() => {
            this._renderTriangle(entity, sprite, camera);
        });
    }
}

window.onload = () => {
    new App();
};