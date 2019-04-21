import Texture from "./Texture";

interface RenderTextureMap {
    [index: string]: RenderTexture;
}

class RenderTexture {
    private _texture            : Texture;
    private _webglTexture       : WebGLTexture;
    private _frameBuffer        : WebGLFramebuffer;
    
    protected static _renderTextures   : RenderTextureMap = {};

    public readonly GL          : WebGLRenderingContext;

    constructor(key: string, width: number, height: number, gl: WebGLRenderingContext) {
        this._webglTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._webglTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        this._frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._webglTexture, 0);

        this._texture = Texture.fromWebGLTexture(width, height, this._webglTexture, gl);

        this.GL = gl;

        RenderTexture._renderTextures[key] = this;
    }

    public static getRenderTexture(key: string): RenderTexture {
        if (!RenderTexture._renderTextures[key]) {
            throw new Error("Error trying to get render texture [" + key + "]");
        }

        return RenderTexture._renderTextures[key];
    }

    public get webglTexture(): WebGLTexture { return this._webglTexture; }
    public get texture(): Texture { return this._texture; }
    public get frameBuffer(): WebGLFramebuffer { return this._frameBuffer; }
}

export default RenderTexture;