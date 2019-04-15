import Renderer from './engine/Renderer';
import Sprite from 'engine/geometries/Sprite';
import Camera from 'engine/Camera';
import Vector2 from 'engine/math/Vector2';
import Texture from 'engine/Texture';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        this._createTriangle();
    }

    private _createTriangle(): void {
        // Create triangle
        const texture = new Texture("img/characters.png", this._renderer.GL);
        const sprite = new Sprite(32.0, 64.0, texture, this._renderer, { pivot: new Vector2(16.0, 64.0) });

        const camera = new Camera();

        // Draw triangle
        this._renderTriangle(sprite, camera);
    }

    private _renderTriangle(sprite: Sprite, camera: Camera): void {
        this._renderer.clear();

        if (sprite.texture.ready) {
            sprite.render(camera);
        }

        requestAnimationFrame(() => {
            this._renderTriangle(sprite, camera);
        });
    }
}

window.onload = () => {
    new App();
};