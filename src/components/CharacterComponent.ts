import Component from "engine/world/Component";
import Vector2 from "engine/math/Vector2";
import Tween from "engine/Tween";
import Image from "engine/geometries/Image";
import Camera from "engine/world/Camera";
import OrderDrawComponent from "./OrderDrawComponent";
import { GRID_SIZE } from "data/Constants";

class CharacterComponent extends Component {
    private _sprite                  : Image;
    private _position               : Vector2;
    private _busy                   : boolean;

    constructor(sprite: Image) {
        super();

        this._sprite = sprite;
        this._position = new Vector2(0.0, 0.0);
        this._busy = false;

        this._position.onChange.add(() => { this._updateEntityPosition(); });
    }

    private _updateEntityPosition(): void {
        this.entity.position.set((this._position.x + 0.5) * GRID_SIZE, (this._position.y + 0.5) * GRID_SIZE);
    }

    private _orderRender(camera: Camera): void {
        this._sprite.render(this.entity, camera);
    }

    public moveTo(xTo: number, yTo: number): void {
        this._busy = true;

        const tween = new Tween(this._position, { x: this._position.x + xTo, y: this._position.y + yTo }, 100, true);
        tween.onComplete.add(() => {
            this._busy = false;
        });
    }

    public start(): void {
        this._updateEntityPosition();

        const orderDraw = this.entity.scene.getEntity("OrderDraw");
        const comp = <OrderDrawComponent>orderDraw.getComponent("OrderDrawComponent");

        comp.renderImage(
            () => { return this.entity.position.y; }, 
            (camera: Camera) => { this._orderRender(camera); }
        );
    }
    
    public get componentName(): string { return "CharacterComponent"; }
    public get isBusy(): boolean { return this._busy; }
}

export default CharacterComponent;