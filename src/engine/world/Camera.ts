import Matrix4 from "../math/Matrix4";
import Vector2 from "../math/Vector2";
import Geometry from "engine/geometries/Geometry";
import Entity from "./Entity";

class Camera {
    private _viewMatrix         : Matrix4;
    private _projMatrix         : Matrix4;
    private _width              : number;
    private _height             : number;
    
    public readonly position           : Vector2;

    constructor(width: number, height: number) {
        this._viewMatrix = Matrix4.identity();
        this._projMatrix = Matrix4.createOrtho(width, height, 0.1, 10.0);
        this.position = new Vector2(0.0, 0.0);

        this._width = width / 2;
        this._height = height / 2;

        this.position.onChange.add(() => { this._updateViewMatrix(); });

        this._updateViewMatrix();
    }

    private _updateViewMatrix(): void {
        this._viewMatrix.translate(-this.position.x, this.position.y, -5.0);
    }

    public isGeometryOnCamera(geometry: Geometry, entity: Entity): boolean {
        const bb = geometry.boundingBox;
        const pos = entity.position;
        const p = this.position;

        if (bb[2] + pos.x < p.x - this._width || bb[0] + pos.x >= p.x + this._width || -bb[1] + pos.y < p.y - this._height || -bb[3] + pos.y >= p.y + this._height) { 
            return false; 
        }

        return true;
    }

    public get projMatrix(): Matrix4 { return this._projMatrix; }
    public get viewMatrix(): Matrix4 {
        return this._viewMatrix;
    }
}

export default Camera;