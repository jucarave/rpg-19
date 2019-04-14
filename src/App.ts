import Renderer from './engine/Renderer';

class App {
    private _renderer           : Renderer;

    constructor() {
        this._renderer = new Renderer(512, 512, document.getElementById("divGame"));
        this._renderer.clear();

        this._createTriangle();
    }

    private _createTriangle(): void {
        // Create triangle
        const vertices = [
            -0.5, -0.5,
             0.5, -0.5,
             0.0,  0.5
        ];
        const indices = [
            0, 1, 2
        ];
        const gl = this._renderer.GL;

        const vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        const iBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        // Draw triangle
        this._renderTriangle(vBuffer, iBuffer);
    }

    private _renderTriangle(vBuffer: WebGLBuffer, iBuffer: WebGLBuffer): void {
        const gl = this._renderer.GL;
        const program = this._renderer.program;
        const aPosition = gl.getAttribLocation(program, "aPosition");

        gl.enableVertexAttribArray(aPosition);

        this._renderer.clear();

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(() => {
            this._renderTriangle(vBuffer, iBuffer);
        });
    }
}

window.onload = () => {
    new App();
};