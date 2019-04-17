import Component from "engine/Component";
import Vector2 from "engine/math/Vector2";
import Tween from "engine/Tween";

class CharacterComponent extends Component {
    private _position               : Vector2;
    private _busy                   : boolean;

    constructor() {
        super();

        this._position = new Vector2(0.0, 0.0);
        this._busy = false;

        this._position.onChange.add(() => { this._updateEntityPosition(); });
    }

    private _updateEntityPosition(): void {
        this.entity.position.set((this._position.x + 0.5) * 32, (this._position.y + 0.5) * 32);
    }

    public moveTo(xTo: number, yTo: number): void {
        this._busy = true;

        const tween = new Tween(this._position, { x: this._position.x + xTo, y: this._position.y + yTo }, 1000, true);
        tween.onComplete.add(() => {
            this._busy = false;
        });
    }

    public start() {
        this._updateEntityPosition();
    }

    public update() {
    }
    
    public get componentName(): string { return "CharacterComponent"; }
    public get isBusy(): boolean { return this._busy; }
}

export default CharacterComponent;