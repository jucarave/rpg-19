import Geometry from "engine/geometries/Geometry";
import Texture from "engine/Texture";
import Entity from "engine/world/Entity";
import Camera from "engine/world/Camera";
import Renderer from "engine/Renderer";
import Matrix4 from "engine/math/Matrix4";

class BasicSeeThroughMaterial {
    private _renderer           : Renderer;
    private _shader             : WebGLProgram;
    private _mvp                : Matrix4;

    private _aPosition          : number;
    private _aTexCoords         : number;
    private _aTexUVs            : number;
    private _uMVP               : WebGLUniformLocation;
    private _uTexture           : WebGLUniformLocation;
    private _uScreenResolution  : WebGLUniformLocation;
    private _uShadowColor       : WebGLUniformLocation;
    private _uEntitiesTexture   : WebGLUniformLocation;

    public init(renderer: Renderer): void {
        this._renderer = renderer;
        this._shader = renderer.getProgram("BasicSeeThrough");
        this._mvp = Matrix4.identity();

        this._getShaderLocations();
    }

    private _getShaderLocations(): void {
        const gl = this._renderer.GL;

        this._aPosition = gl.getAttribLocation(this._shader, "aPosition");
        this._aTexCoords = gl.getAttribLocation(this._shader, "aTexCoords");
        this._aTexUVs = gl.getAttribLocation(this._shader, "aTexUVs");

        this._uMVP = gl.getUniformLocation(this._shader, "uMVP");
        this._uScreenResolution = gl.getUniformLocation(this._shader, "uScreenResolution");
        this._uShadowColor = gl.getUniformLocation(this._shader, "uShadowColor");

        this._uTexture = gl.getUniformLocation(this._shader, "uTexture");
        this._uEntitiesTexture = gl.getUniformLocation(this._shader, "uEntitiesTexture");
    }

    private _uploadGeometry(geometry: Geometry): void {
        const gl = this._renderer.GL;

        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vBuffer);
        gl.vertexAttribPointer(this._aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.uvBuffer);
        gl.vertexAttribPointer(this._aTexUVs, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.tBuffer);
        gl.vertexAttribPointer(this._aTexCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.iBuffer);
    }

    private _uploadUniforms(entity: Entity, camera: Camera): void {
        const gl = this._renderer.GL;

        this._mvp.copy(entity.transformationMatrix);
        this._mvp.multiply(camera.viewMatrix);
        this._mvp.multiply(camera.projMatrix);

        gl.uniformMatrix4fv(this._uMVP, false, this._mvp.data);

        gl.uniform2f(this._uScreenResolution, gl.canvas.width, gl.canvas.height);
        gl.uniform3f(this._uShadowColor, 0.0, 0.635294, 0.909803);
    }

    private _uploadTexture(uniform: WebGLUniformLocation, textureUnit: number, texture: Texture): void {
        const gl = this._renderer.GL;

        gl.bindTexture(gl.TEXTURE_2D, texture.texture);
        gl.uniform1i(uniform, textureUnit);
    }

    public render(geometry: Geometry, texture: Texture, seeThrough: Texture, entity: Entity, camera: Camera): void {
        const gl = this._renderer.GL;

        if (this._renderer.useProgram(this._shader)) {
            gl.enableVertexAttribArray(this._aPosition);
            gl.enableVertexAttribArray(this._aTexCoords);
            gl.enableVertexAttribArray(this._aTexUVs);
        }

        this._uploadGeometry(geometry);
        this._uploadUniforms(entity, camera);
        
        gl.activeTexture(gl.TEXTURE0);
        this._uploadTexture(this._uTexture, 0, texture);
        
        gl.activeTexture(gl.TEXTURE1);
        this._uploadTexture(this._uEntitiesTexture, 1, seeThrough);

        gl.drawElements(gl.TRIANGLES, geometry.trianglesLength, gl.UNSIGNED_SHORT, 0);
    }
}

export default new BasicSeeThroughMaterial();