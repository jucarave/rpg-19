class Emitter {
    private _listeners          : Array<Function>;

    constructor() {
        this._listeners = new Array();
    }

    public add(callback: Function): void {
        this._listeners.push(callback);
    }

    public dispatch(): void {
        this._listeners.forEach((callback: Function) => {
            callback();
        })
    }
}

export default Emitter;