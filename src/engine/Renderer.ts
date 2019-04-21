import { BasicShader } from './shaders/Basic';
import { ShaderStruct, ShaderCollection } from './Types';
import Input from './Input';
import Tween from './Tween';
import { BasicSeeThroughShader } from './shaders/BasicSeeThrough';

class Renderer {
    private _canvas         : HTMLCanvasElement;
    private _gl             : WebGLRenderingContext;
    private _program        : WebGLProgram;
    private _shaders        : ShaderCollection;

    constructor(width: number, height: number, container: HTMLElement) {
        this._createcanvas(width, height, container);
        this._initGL();
        this._initShaders();

        Input.init(this._canvas);
    }

    private _createcanvas(width: number, height: number, container: HTMLElement): void {
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;

        this._gl = this._canvas.getContext("webgl");
        if (!this._gl) {
            throw new Error("Error trying to create WebGL Context");
        }

        if (container) {
            container.appendChild(this._canvas);
        }
    }

    private _initGL(): void {
        const gl = this._gl;

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
    }

    private _initShaders(): void {
        this._shaders = {
            Basic: this._compileShader(BasicShader),
            BasicSeeThrough: this._compileShader(BasicSeeThroughShader)
        };
    }

    private _compileShader(shader: ShaderStruct): WebGLProgram {
        const gl = this._gl;

        const vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, shader.vertexShader);
        gl.compileShader(vShader);

        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vShader));
            throw new Error("Error trying to compile vertex shader");
        }

        const fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, shader.fragmentShader);
        gl.compileShader(fShader);

        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fShader));
            throw new Error("Error trying to compile fragment shader");
        }

        const program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program));
            throw new Error("Error trying to link shaders to program");
        }

        return program;
    }

    public useProgram(program: WebGLProgram): boolean {
        if (this._program === program) { return false; }

        this._program = program;
        this._gl.useProgram(program);

        return true;
    }

    public clear(): void {
        const gl = this._gl;

        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    public getProgram(program: 'Basic' | 'BasicSeeThrough'): WebGLProgram {
        return this._shaders[program];
    }

    public update(): void {
        Tween.updateTweens();
    }

    public get GL(): WebGLRenderingContext { return this._gl; }

    public get program(): WebGLProgram { return this._program; }
}

export default Renderer;