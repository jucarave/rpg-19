import Component from "engine/world/Component";
import Vector2 from "engine/math/Vector2";
import Tween from "engine/Tween";
import Image from "engine/geometries/Image";
import Camera from "engine/world/Camera";
import OrderDraw from "./OrderDraw";
import { GRID_SIZE } from "data/Constants";
import BasicMaterial from "engine/materials/BasicMaterial";
import RenderTexture from "engine/RenderTexture";
import WorldMap from "./WorldMap";

class Character extends Component {
    private _sprite                 : Image;
    private _position               : Vector2;
    private _busy                   : boolean;
    private _worldMap               : WorldMap;

    constructor(sprite: Image) {
        super();

        this._sprite = sprite;
        this._position = new Vector2(0.0, 0.0);
        this._busy = false;

        this._position.onChange.add(() => { this._updateEntityPosition(); });
    }

    private _updateEntityPosition(): void {
        this.entity.position.set(((this._position.x + 0.5) * GRID_SIZE) << 0, ((this._position.y + 0.5) * GRID_SIZE) << 0);
    }

    private _orderRender(camera: Camera): void {
        const renderTexture = RenderTexture.getRenderTexture("Entities");
        const gl = renderTexture.GL;
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderTexture.frameBuffer);
        BasicMaterial.render(this._sprite, this._sprite.texture, this.entity, camera);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        BasicMaterial.render(this._sprite, this._sprite.texture, this.entity, camera);
    }

    public moveTo(xTo: number, yTo: number): void {
        if (this._worldMap.isSolid(this._position.x + xTo, this._position.y + yTo)) {
            return;
        }
        
        this._busy = true;

        const tween = new Tween(this._position, { x: this._position.x + xTo, y: this._position.y + yTo }, 100, true);
        tween.onComplete.add(() => {
            this._busy = false;
        });
    }

    public start(): void {
        this._updateEntityPosition();

        const orderDraw = this.entity.scene.getEntity("OrderDraw");
        const comp = <OrderDraw> orderDraw.getComponent("OrderDraw");

        this._worldMap = <WorldMap> this.entity.scene.getEntity("WorldMap").getComponent("WorldMap");

        comp.renderImage(
            () => { return this.entity.position.y; }, 
            (camera: Camera) => { this._orderRender(camera); }
        );
    }
    
    public get componentName(): string { return "Character"; }
    public get isBusy(): boolean { return this._busy; }
}

export default Character;