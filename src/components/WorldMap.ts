import Component from "engine/world/Component";

class WorldMap extends Component {
    private _solidMap               : Array<number>;
    private _width                  : number;
    private _height                 : number;

    constructor(solidMap: Array<number>, width: number, height: number) {
        super();

        this._solidMap = solidMap;
        this._width = width;
        this._height = height;
    }

    public isSolid(x: number, y: number): boolean {
        const ind = y * this._width + x;
        const tile = this._solidMap[ind];

        return (tile > 0);
    }

    public get componentName(): string { return "WorldMap"; }
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
}

export default WorldMap;