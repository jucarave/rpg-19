import { VERTEX_SIZE } from '../Constants';

class Geometry {
    protected _vertices             : Array<number>;
    protected _texUVs               : Array<number>;
    protected _texCoords            : Array<number>;
    protected _indices              : Array<number>;
    protected _boundingBox          : Array<number>
    
    protected _vBuffer              : WebGLBuffer;
    protected _uvBuffer             : WebGLBuffer;
    protected _tBuffer              : WebGLBuffer;
    protected _iBuffer              : WebGLBuffer;
    protected _trianglesLength      : number;

    constructor() {
        this._vertices = [];
        this._indices = [];
        this._texUVs = [];
        this._texCoords = [];
        this._boundingBox = null;
    }

    private _calculateBBox(): void {
        let x1 = Infinity;
        let y1 = Infinity;
        let x2 = -Infinity;
        let y2 = -Infinity;

        for (let i=0;i<this._vertices.length;i+=2) {
            x1 = Math.min(x1, this._vertices[i]);
            y1 = Math.min(y1, this._vertices[i + 1]);
            x2 = Math.max(x2, this._vertices[i]);
            y2 = Math.max(y2, this._vertices[i + 1]);
        }
        

        this._boundingBox = [x1, y1, x2, y2];
    }

    public addVertice(x: number, y: number): void {
        this._vertices.push(x, y);
    }

    public addUV(x: number, y: number, z: number, w: number): void {
        this._texUVs.push(x, y, z, w);
    }

    public addTexCoord(x: number, y: number): void {
        this._texCoords.push(x, y);
    }

    public addTriangle(vertex1: number, vertex2: number, vertex3: number): void {
        if (this._vertices[vertex1 * VERTEX_SIZE] === undefined) { throw new Error("Can't find vertex [" + vertex1 + "]"); }
        if (this._vertices[vertex2 * VERTEX_SIZE] === undefined) { throw new Error("Can't find vertex [" + vertex2 + "]"); }
        if (this._vertices[vertex3 * VERTEX_SIZE] === undefined) { throw new Error("Can't find vertex [" + vertex3 + "]"); }

        this._indices.push(vertex1, vertex2, vertex3);
    }

    public build(gl: WebGLRenderingContext): void {
        this._calculateBBox();

        this._vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);

        this._uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._texUVs), gl.STATIC_DRAW);

        this._tBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._tBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._texCoords), gl.STATIC_DRAW);

        this._iBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);

        this._trianglesLength = this._indices.length;

        this._vertices = null;
        this._texCoords = null;
        this._texUVs = null;
        this._indices = null;
    }

    public get trianglesLength(): number { return this._trianglesLength; }
    public get vBuffer(): WebGLBuffer { return this._vBuffer; }
    public get uvBuffer(): WebGLBuffer { return this._uvBuffer; }
    public get tBuffer(): WebGLBuffer { return this._tBuffer; }
    public get iBuffer(): WebGLBuffer { return this._iBuffer; }
    public get boundingBox(): Array<number> { return this._boundingBox; }
}

export default Geometry;