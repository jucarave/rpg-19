import Renderer from './engine/Renderer';
import Image from 'engine/geometries/Image';
import Texture from 'engine/Texture';
import Entity from 'engine/world/Entity';
import Scene from 'engine/world/Scene';
import PlayerComponent from 'components/PlayerComponent';
import CharacterComponent from 'components/CharacterComponent';
import MapLoader from 'data/MapLoader';
import OrderDrawComponent from 'components/OrderDrawComponent';
import { GRID_SIZE } from 'data/Constants';
import BasicMaterial from 'engine/materials/BasicMaterial';
import RenderTexture from 'engine/RenderTexture';
import { ceilToPowerOf2 } from 'engine/Utilts';
import BasicSeeThroughMaterial from 'engine/materials/BasicSeeThroughMaterial';
import CameraFollowComponent from 'components/CameraFollowComponent';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(1024, 576, document.getElementById("divGame"));
        this._renderer.clear();

        Texture.loadTexture("characters", "img/characters.png", this._renderer.GL);
        Texture.loadTexture("worldItems", "img/worldItems.png", this._renderer.GL);
        Texture.loadTexture("tileset", "img/tileset.png", this._renderer.GL).loadTiles(8, 8, 32);

        const size = ceilToPowerOf2(this._renderer.GL.canvas.width);
        new RenderTexture("Entities", size, size, this._renderer.GL);

        this._loading();
    }

    private _loading(): void {
        if (!Texture.areTexturesReady()) {
            requestAnimationFrame(() => { this._loading(); });
            return;
        }

        this._initMaterials();
        this._createScene();
    }

    private _initMaterials(): void {
        BasicMaterial.init(this._renderer);
        BasicSeeThroughMaterial.init(this._renderer);
    }

    private _createScene(): void {
        // Create scene
        const texture = Texture.getTexture("characters");
        const sprite = new Image(texture, this._renderer).createSprite(32.0, 64.0, { v2Pivot: [16.0, 64.0], v4UVs: [0.0, 0.0, 32.0, 64.0] });
        const entity = new Entity("Player", 0, 0, null);

        entity.addComponent(new CharacterComponent(sprite));
        entity.addComponent(new PlayerComponent());
        entity.addComponent(new CameraFollowComponent());

        const scene = new Scene();
        scene.camera.position.set(8*GRID_SIZE, 4.5*GRID_SIZE);

        scene.addLayer("Background");
        scene.addLayer("Entities");
        scene.addLayer("Foreground");
        
        scene.addEntity(entity, "Entities");
        
        const orderDraw = new Entity("OrderDraw", 0, 0, null);
        orderDraw.addComponent(new OrderDrawComponent());
        scene.addEntity(orderDraw, "Entities");

        // Tileset
        MapLoader.loadMap(scene, this._renderer);

        // Draw scene
        this._renderScene(scene);
    }

    private _clearRenders(): void {
        const gl = this._renderer.GL;

        gl.bindFramebuffer(gl.FRAMEBUFFER, RenderTexture.getRenderTexture("Entities").frameBuffer);
        this._renderer.clear();

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._renderer.clear();
    }

    private _renderScene(scene: Scene): void {
        this._renderer.update();
        this._clearRenders();

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