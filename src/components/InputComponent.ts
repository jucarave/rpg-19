import Component from "engine/Component";
import Input from "engine/Input";

export type InputType = "UP" | "LEFT" | "DOWN" | "RIGHT";

class InputComponent extends Component {
    private _input = {
        UP: 0,
        LEFT: 0,
        DOWN: 0,
        RIGHT: 0
    };

    constructor() {
        super();

        this._handleKeys();
    }

    private _handleKeys(): void {
        Input.onKeyDown.add((ev: KeyboardEvent) => {
            let keyName = this._getKeyName(ev.keyCode);
            if (this._input[keyName] === 2) { return; }
            this._input[keyName] = 1;
        });

        Input.onKeyUp.add((ev: KeyboardEvent) => {
            let keyName = this._getKeyName(ev.keyCode);
            this._input[keyName] = 0;
        });
    }

    private _getKeyName(keyCode: number): InputType {
        if (keyCode === 37) { return "LEFT"; } else 
        if (keyCode === 38) { return "UP"; } else 
        if (keyCode === 39) { return "RIGHT"; } else 
        if (keyCode === 40) { return "DOWN"; }
    }

    public keyIsPressed(keyName: InputType): boolean {
        if (this._input[keyName] === 1) {
            this._input[keyName] = 2;
            return true;
        }

        return false;
    }

    public get componentName(): string { return "InputComponent"; }
}

export default InputComponent;