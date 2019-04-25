import Component from "engine/world/Component";
import Input from 'engine/Input';
import Character from "./Character";

class Player extends Component {
    
    private _characterController    : Character;

    constructor() {
        super();
    }

    public start(): void {
        this._characterController = <Character> this.entity.getComponent("Character");
    }

    private _checkMovement(): void {
        let xTo = 0;
        let yTo = 0;

        if (Input.getKeyPress(Input.KEYS.RIGHT)) { xTo = 1; } else
        if (Input.getKeyPress(Input.KEYS.LEFT)) { xTo = -1; } else 
        if (Input.getKeyPress(Input.KEYS.DOWN)) { yTo = 1; } else
        if (Input.getKeyPress(Input.KEYS.UP)) { yTo = -1; }

        if (xTo != 0 || yTo != 0) {
            this._characterController.moveTo(xTo, yTo);
        }
    }

    public update() {
        if (this._characterController.isBusy) { return; }

        this._checkMovement();
    }

    public get componentName(): string { return "Player"; }
}

export default Player;