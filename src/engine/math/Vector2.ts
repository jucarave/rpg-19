class Vector2 {
    private _x          : number;
    private _y          : number;

    constructor (x: number, y: number) {
        this.set(x, y);
    }

    public set(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }

    public set x(x: number) { this._x = x; }
    public get x(): number { return this._x; }

    public set y(y: number) { this._y = y; }
    public get y(): number { return this._y; }
}

export default Vector2;