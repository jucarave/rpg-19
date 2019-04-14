import Geometry from './Geometry';
import Renderer from '../Renderer';

class Sprite extends Geometry {
    private _renderer       : Renderer;
    private _shader         : WebGLProgram;
    private _aPosition      : number;

    public readonly width   : number;
    public readonly height   : number;

    constructor(width: number, height: number, renderer: Renderer) {
        super();

        this._renderer = renderer;
        this._shader = renderer.getProgram("Basic");
        this.width = width;
        this.height = height;

        this._getShaderLocations();

        this._buildSprite();
    }

    private _getShaderLocations(): void {
        this._aPosition = this._renderer.GL.getAttribLocation(this._shader, "aPosition");
    }

    private _buildSprite(): void {
        this.addVertice(-0.5, -0.5);
        this.addVertice( 0.5, -0.5);
        this.addVertice(-0.5,  0.5);
        this.addVertice( 0.5,  0.5);

        this.addTriangle(0, 1, 2);
        this.addTriangle(1, 3, 2);

        this.build(this._renderer.GL);
    }

    private _renderGeometry(): void {
        const gl = this._renderer.GL;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
        gl.vertexAttribPointer(this._aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
    }

    public render(): void {
        const gl = this._renderer.GL;

        if (this._renderer.useProgram(this._shader)) {
            gl.enableVertexAttribArray(this._aPosition);
        }

        this._renderGeometry();

        gl.drawElements(gl.TRIANGLES, this._trianglesLength, gl.UNSIGNED_SHORT, 0);
    }
}

export default Sprite;