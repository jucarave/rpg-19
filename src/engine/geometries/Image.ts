import Geometry from './Geometry';
import Renderer from '../Renderer';
import Matrix4 from 'engine/math/Matrix4';
import Camera from 'engine/world/Camera';
import { SpriteOptions } from '../Types';
import Texture from 'engine/Texture';
import Entity from 'engine/world/Entity';
import { VERTEX_SIZE } from 'engine/Constants';

const defaultOptions: SpriteOptions = {
    v2Pivot: [0, 0],
    v4UVs: [0, 0, 1, 1]
};

class Image extends Geometry {
    private _renderer       : Renderer;
    private _shader         : WebGLProgram;
    private _texture        : Texture;
    private _mvp            : Matrix4;
    private _gridSize       : number;
    
    private _aPosition      : number;
    private _aTexCoords     : number;
    private _aTexUVs        : number;
    private _uMVP           : WebGLUniformLocation;
    private _uTexture       : WebGLUniformLocation;

    constructor(texture: Texture, renderer: Renderer) {
        super();

        this._renderer = renderer;
        this._shader = renderer.getProgram("Basic");
        this._texture = texture;
        
        this._mvp = Matrix4.identity();

        this._getShaderLocations();
    }

    private _mergeOptions(options: SpriteOptions): SpriteOptions {
        const _options: SpriteOptions = {};

        _options.v2Pivot = options.v2Pivot || defaultOptions.v2Pivot;
        _options.v4UVs = options.v4UVs || defaultOptions.v4UVs;

        return _options;
    }

    private _getShaderLocations(): void {
        const gl = this._renderer.GL;

        this._aPosition = gl.getAttribLocation(this._shader, "aPosition");
        this._aTexCoords = gl.getAttribLocation(this._shader, "aTexCoords");
        this._aTexUVs = gl.getAttribLocation(this._shader, "aTexUVs");

        this._uMVP = gl.getUniformLocation(this._shader, "uMVP");

        this._uTexture = gl.getUniformLocation(this._shader, "uTexture");
    }

    private _uploadGeometry(): void {
        const gl = this._renderer.GL;

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
        gl.vertexAttribPointer(this._aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.vertexAttribPointer(this._aTexUVs, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._tBuffer);
        gl.vertexAttribPointer(this._aTexCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
    }

    private _uploadUniforms(entity: Entity, camera: Camera): void {
        const gl = this._renderer.GL;

        this._mvp.copy(entity.transformationMatrix);
        this._mvp.multiply(camera.viewMatrix);
        this._mvp.multiply(camera.projMatrix);

        gl.uniformMatrix4fv(this._uMVP, false, this._mvp.data);
    }

    private _uploadTexture(): void {
        const gl = this._renderer.GL;

        gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
        gl.uniform1i(this._uTexture, 0);
    }

    public setGridSize(gridSize: number): Image {
        this._gridSize = gridSize;
        return this;
    }

    public addSprite(x: number, y: number, width: number, height: number, options: SpriteOptions = null): void {
        const w = width;
        const h = height;
        const o = this._mergeOptions(options);
        const px = o.v2Pivot[0];
        const py = -o.v2Pivot[1];

        this.addVertice(x + 0.0 - px, -y + (-h - py));
        this.addVertice(x +   w - px, -y + (-h - py));
        this.addVertice(x + 0.0 - px, -y + (0.0 - py));
        this.addVertice(x +   w - px, -y + (0.0 - py));

        this.addTexCoord(0.0, 1.0);
        this.addTexCoord(1.0, 1.0);
        this.addTexCoord(0.0, 0.0);
        this.addTexCoord(1.0, 0.0);

        const uvs = o.v4UVs;
        for (let i=0;i<4;i++) {
            this.addUV(uvs[0]/this._texture.width, uvs[1]/this._texture.height, uvs[2]/this._texture.width, uvs[3]/this._texture.height);
        }

        this.addTriangle(0, 1, 2);
        this.addTriangle(1, 3, 2);
    }

    public addTile(x: number, y: number, tileX: number, tileY: number): Image {
        const t = this._vertices.length / VERTEX_SIZE;
        const gs = this._gridSize;
        const uvs = this._texture.getTileUVs(tileX, tileY);

        this.addVertice(x * gs, (-y - 1) * gs);
        this.addVertice((x + 1) * gs, (-y - 1) * gs);
        this.addVertice(x * gs, -y * gs);
        this.addVertice((x + 1) * gs, -y * gs);

        this.addTexCoord(0.0, 1.0);
        this.addTexCoord(1.0, 1.0);
        this.addTexCoord(0.0, 0.0);
        this.addTexCoord(1.0, 0.0);

        for (let i=0;i<4;i++) {
            this.addUV(uvs[0]/this._texture.width, uvs[1]/this._texture.height, uvs[2]/this._texture.width, uvs[3]/this._texture.height);
        }

        this.addTriangle(t+0, t+1, t+2);
        this.addTriangle(t+1, t+3, t+2);

        return this;
    }

    public createSprite(width: number, height: number, options: SpriteOptions = null) : Image {
        this.addSprite(0, 0, width, height, options);
        this.build();

        return this;
    }

    public build(): Image {
        super.build(this._renderer.GL);

        return this;
    }

    public render(entity: Entity, camera: Camera): void {
        const gl = this._renderer.GL;

        if (this._renderer.useProgram(this._shader)) {
            gl.enableVertexAttribArray(this._aPosition);
            gl.enableVertexAttribArray(this._aTexCoords);
            gl.enableVertexAttribArray(this._aTexUVs);
            gl.activeTexture(gl.TEXTURE0);
        }

        this._uploadGeometry();
        this._uploadUniforms(entity, camera);
        this._uploadTexture();

        gl.drawElements(gl.TRIANGLES, this._trianglesLength, gl.UNSIGNED_SHORT, 0);
    }

    public get texture(): Texture { return this._texture; }
}

export default Image;