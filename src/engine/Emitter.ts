class Emitter {
    private _listeners          : Array<Function>;

    constructor() {
        this._listeners = new Array();
    }

    public add(callback: Function): void {
        this._listeners.push(callback);
    }

    public dispatch(parameters?: any): void {
        this._listeners.forEach((callback: Function) => {
            callback(parameters);
        })
    }
}

export default Emitter;