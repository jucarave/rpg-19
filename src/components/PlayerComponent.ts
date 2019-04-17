import Component from "engine/Component";
import Input from 'engine/Input';
import CharacterComponent from "./CharacterComponent";

class PlayerComponent extends Component {
    
    private _characterController    : CharacterComponent;

    constructor() {
        super();
    }

    public start(): void {
        this._characterController = <CharacterComponent> this.entity.getComponent("CharacterComponent");
    }

    private _checkMovement(): void {
        let xTo = 0;
        let yTo = 0;

        if (Input.getKeyPressed(Input.KEYS.RIGHT)) { xTo = 1; } else
        if (Input.getKeyPressed(Input.KEYS.LEFT)) { xTo = -1; } else 
        if (Input.getKeyPressed(Input.KEYS.DOWN)) { yTo = 1; } else
        if (Input.getKeyPressed(Input.KEYS.UP)) { yTo = -1; }

        if (xTo != 0 || yTo != 0) {
            this._characterController.moveTo(xTo, yTo);
        }
    }

    public update() {
        if (this._characterController.isBusy) { return; }
        
        this._checkMovement();
    }

    public get componentName(): string { return "PlayerComponent"; }
}

export default PlayerComponent;