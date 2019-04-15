import Geometry from './Geometry';
import Renderer from '../Renderer';
import Matrix4 from 'engine/math/Matrix4';
import Camera from 'engine/Camera';

class Sprite extends Geometry {
    private _renderer       : Renderer;
    private _shader         : WebGLProgram;
    private _mvp            : Matrix4;
    
    private _aPosition      : number;
    private _uMVP           : WebGLUniformLocation;

    public readonly width   : number;
    public readonly height   : number;

    constructor(width: number, height: number, renderer: Renderer) {
        super();

        this._renderer = renderer;
        this._shader = renderer.getProgram("Basic");
        this.width = width;
        this.height = height;

        this._mvp = Matrix4.identity();

        this._getShaderLocations();

        this._buildSprite();
    }

    private _getShaderLocations(): void {
        const gl = this._renderer.GL;

        this._aPosition = gl.getAttribLocation(this._shader, "aPosition");

        this._uMVP = gl.getUniformLocation(this._shader, "uMVP");
    }

    private _buildSprite(): void {
        const w = this.width;
        const h = this.height;

        this.addVertice(0.0,  -h);
        this.addVertice(  w,  -h);
        this.addVertice(0.0, 0.0);
        this.addVertice(  w, 0.0);

        this.addTriangle(0, 1, 2);
        this.addTriangle(1, 3, 2);

        this.build(this._renderer.GL);
    }

    private _uploadGeometry(): void {
        const gl = this._renderer.GL;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
        gl.vertexAttribPointer(this._aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
    }

    private _uploadUniforms(camera: Camera): void {
        const gl = this._renderer.GL;

        this._mvp.copy(camera.viewMatrix);
        this._mvp.multiply(camera.projMatrix);

        gl.uniformMatrix4fv(this._uMVP, false, this._mvp.data);
    }

    public render(camera: Camera): void {
        const gl = this._renderer.GL;

        if (this._renderer.useProgram(this._shader)) {
            gl.enableVertexAttribArray(this._aPosition);
        }

        this._uploadGeometry();
        this._uploadUniforms(camera);

        gl.drawElements(gl.TRIANGLES, this._trianglesLength, gl.UNSIGNED_SHORT, 0);
    }
}

export default Sprite;