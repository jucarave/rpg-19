import Component from "engine/Component";
import Vector2 from "engine/math/Vector2";
import Input from 'engine/Input';

class PlayerComponent extends Component {
    private _position               : Vector2;

    constructor() {
        super();

        this._position = new Vector2(0.0, 0.0);
    }

    public start(): void {
    }

    private _checkMovement(): void {
        if (Input.getKeyPressed(Input.KEYS.RIGHT)) { this._position.x += 1; } else
        if (Input.getKeyPressed(Input.KEYS.LEFT)) { this._position.x -= 1; } else 
        if (Input.getKeyPressed(Input.KEYS.DOWN)) { this._position.y += 1; } else
        if (Input.getKeyPressed(Input.KEYS.UP)) { this._position.y -= 1; }
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