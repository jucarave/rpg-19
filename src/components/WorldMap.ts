import Component from "engine/world/Component";
import Entity from "engine/world/Entity";

class WorldMap extends Component {
    private _map                : Array<Uint8Array>;
    private _entities           : Array<Entity>;
    private _width              : number;
    private _height             : number;

    constructor(width: number, height: number) {
        super();

        this._width = width;
        this._height = height;
        this._entities = [];
        this._map  = new Array(this._width * this._height);
    }

    public isSolid(x: number, y: number): boolean {
        const _x = Math.floor(x / 64.0);
        const _y = Math.floor(y / 64.0);
        const ind = _y * this._width +  _x;
        const solid = this._map[ind];

        if (!solid) { return true; }

        return (solid[(y - _y * 64) * 64 + (x - _x * 64)] > 0);
    }

    public addSolidMap(x: number, y: number, solidMap: Uint8Array, entity: Entity): void {
        const ind = y * this._width + x;
        this._map[ind] = solidMap;
        this._entities.push(entity);
    }

    public destroy(): void {
        this._entities.forEach((entity: Entity) => {
            entity.destroy();
        });
    }

    public get componentName(): string { return "WorldMap"; }
}

export default WorldMap;