import Emitter from "./Emitter";

class Input {
    private _element            : HTMLElement;
    private _focus              : boolean;

    public onKeyDown            : Emitter;
    public onKeyUp              : Emitter;

    public init(element: HTMLElement): void {
        this._element = element;
        this.onKeyDown = new Emitter();
        this.onKeyUp = new Emitter();

        document.onclick = (ev: MouseEvent) => {
            this._focus = (ev.target === this._element);
        };

        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (!this._focus) { return; }

            this.onKeyDown.dispatch(ev);
        });

        document.addEventListener("keyup", (ev: KeyboardEvent) => {
            if (!this._focus) { return; }

            this.onKeyUp.dispatch(ev);
        });
    }
}

export default new Input();