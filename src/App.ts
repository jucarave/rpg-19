import Renderer from './engine/Renderer';
import Sprite from 'engine/geometries/Sprite';
import Camera from 'engine/Camera';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        this._createTriangle();
    }

    private _createTriangle(): void {
        // Create triangle
        const sprite = new Sprite(32.0, 32.0, this._renderer);

        const camera = new Camera();

        // Draw triangle
        this._renderTriangle(sprite, camera);
    }

    private _renderTriangle(sprite: Sprite, camera: Camera): void {
        this._renderer.clear();
        sprite.render(camera);

        requestAnimationFrame(() => {
            this._renderTriangle(sprite, camera);
        });
    }
}

window.onload = () => {
    new App();
};