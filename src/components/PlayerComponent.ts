import Component from "engine/Component";
import InputComponent from "./InputComponent";
import Vector2 from "engine/math/Vector2";

class PlayerComponent extends Component {
    private _inputComponent         : InputComponent;
    private _position               : Vector2;

    constructor() {
        super();

        this._position = new Vector2(0.0, 0.0);
    }

    public start(): void {
        this._inputComponent = <InputComponent> this.entity.getComponent("InputComponent");
    }

    private _checkMovement(): void {
        if (this._inputComponent.keyIsPressed("RIGHT")) { this._position.x += 1; } else
        if (this._inputComponent.keyIsPressed("LEFT")) { this._position.x -= 1; } else 
        if (this._inputComponent.keyIsPressed("DOWN")) { this._position.y += 1; } else
        if (this._inputComponent.keyIsPressed("UP")) { this._position.y -= 1; }
    }

    private _updateEntityPosition(): void {
        this.entity.position.set((this._position.x + 0.5) * 32, (this._position.y + 1.0) * 32);
    }

    public update() {
        this._checkMovement();

        this._updateEntityPosition();
    }

    public get componentName(): string { return "PlayerComponent"; }
}

export default PlayerComponent;