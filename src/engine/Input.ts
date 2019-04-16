import Emitter from "./Emitter";

class Input {
    private _keys               : Uint8Array;
    private _element            : HTMLElement;
    private _focus              : boolean;

    public onKeyDown            : Emitter;
    public onKeyUp              : Emitter;
    
    public readonly KEYS = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    public init(element: HTMLElement): void {
        this._element = element;
        this._keys = new Uint8Array(255);
        this.onKeyDown = new Emitter();
        this.onKeyUp = new Emitter();

        document.onclick = (ev: MouseEvent) => {
            this._focus = (ev.target === this._element);
        };

        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (!this._focus) { return; }

            this.onKeyDown.dispatch(ev);

            const keyCode = ev.keyCode;

            if (this._keys[keyCode] === 2) { return; }

            this._keys[keyCode] = 1;
        });

        document.addEventListener("keyup", (ev: KeyboardEvent) => {
            if (!this._focus) { return; }

            this.onKeyUp.dispatch(ev);

            const keyCode = ev.keyCode;

            this._keys[keyCode] = 0;
        });
    }

    public getKeyPressed(keyCode: number): boolean {
        if (this._keys[keyCode] === 1) {
            this._keys[keyCode] = 2;
            return true;
        }

        return false;
    }
}

export default new Input();