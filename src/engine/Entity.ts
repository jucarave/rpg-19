import Vector2 from "./math/Vector2";
import Sprite from "./geometries/Sprite";
import Camera from "./Camera";
import Matrix4 from "./math/Matrix4";

class Entity {
    private _sprite                     : Sprite;
    private _transMatrix                : Matrix4;

    public readonly position            : Vector2;

    constructor(x: number, y: number, sprite?: Sprite) {
        this.position = new Vector2(x, y);
        this._sprite = sprite;
        this._transMatrix = Matrix4.identity();

        this.position.onChange.add(() => { this._updateTransformationMatrix(); });
    }

    private _updateTransformationMatrix(): void {
        this._transMatrix.translate(this.position.x, this.position.y, 0.0);
    }

    public render(camera: Camera): void {
        if (!this._sprite) { return; }

        this._sprite.render(this, camera);
    }

    public get transformationMatrix(): Matrix4 {
        return this._transMatrix;
    }
}

export default Entity;