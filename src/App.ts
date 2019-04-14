import Renderer from './engine/Renderer';
import Sprite from 'engine/geometries/Sprite';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(512, 512, document.getElementById("divGame"));
        this._renderer.clear();

        this._createTriangle();
    }

    private _createTriangle(): void {
        // Create triangle
        const sprite = new Sprite(32.0, 32.0, this._renderer);

        // Draw triangle
        this._renderTriangle(sprite);
    }

    private _renderTriangle(sprite: Sprite): void {
        this._renderer.clear();
        sprite.render();

        requestAnimationFrame(() => {
            this._renderTriangle(sprite);
        });
    }
}

window.onload = () => {
    new App();
};