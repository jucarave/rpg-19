import Component from "engine/Component";
import Vector2 from "engine/math/Vector2";
import Input from 'engine/Input';
import Tween from "engine/Tween";

class PlayerComponent extends Component {
    private _position               : Vector2;

    constructor() {
        super();

        this._position = new Vector2(0.0, 0.0);
    }

    public start(): void {
    }

    private _checkMovement(): void {
        let xTo = 0;
        let yTo = 0;

        if (Input.getKeyPressed(Input.KEYS.RIGHT)) { xTo = 1; } else
        if (Input.getKeyPressed(Input.KEYS.LEFT)) { xTo = -1; } else 
        if (Input.getKeyPressed(Input.KEYS.DOWN)) { yTo = 1; } else
        if (Input.getKeyPressed(Input.KEYS.UP)) { yTo = -1; }

        // TODO: Move this to a CharacterComponent
        if (xTo != 0 || yTo != 0) {
            const tween = new Tween(this._position, { x: this._position.x + xTo, y: this._position.y + yTo }, 1000, true);
            tween.onComplete.add(() => {
                // TODO: Player is not busy anymore
            });
        }
    }

    private _updateEntityPosition(): void {
        this.entity.position.set((this._position.x + 0.5) * 32, (this._position.y + 0.5) * 32);
    }

    public update() {
        this._checkMovement();

        this._updateEntityPosition();
    }

    public get componentName(): string { return "PlayerComponent"; }
}

export default PlayerComponent;