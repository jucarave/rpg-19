import Matrix4 from "./math/Matrix4";
import Vector2 from "./math/Vector2";

class Camera {
    private _viewMatrix         : Matrix4;
    private _projMatrix         : Matrix4;
    
    public readonly position           : Vector2;

    constructor() {
        this._viewMatrix = Matrix4.identity();
        this._projMatrix = Matrix4.createOrtho(512, 288, 0.1, 10.0);
        this.position = new Vector2(0.0, 0.0);

        this.position.onChange.add(() => { this._updateViewMatrix(); });

        this._updateViewMatrix();
    }

    private _updateViewMatrix(): void {
        this._viewMatrix.translate(-this.position.x, this.position.y, -5.0);
    }

    public get projMatrix(): Matrix4 { return this._projMatrix; }
    public get viewMatrix(): Matrix4 {
        return this._viewMatrix;
    }
}

export default Camera;