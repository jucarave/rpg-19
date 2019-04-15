interface TextureType {
    [index: string]: Texture;
}

class Texture {
    private _image      : HTMLImageElement;
    private _texture    : WebGLTexture;
    private _ready      : boolean;

    protected static _textures      : TextureType;

    constructor(src: string, gl: WebGLRenderingContext) {
        this._ready = false;

        this._image = new Image();
        this._image.src = src;

        this._image.onload = () => {
            this._parseTexture(gl);
        };
    }

    private _parseTexture(gl: WebGLRenderingContext): void {
        this._ready = true;

        this._texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public static loadTexture(key: string, src: string, gl: WebGLRenderingContext): void {
        if (!Texture._textures) { 
            Texture._textures = {}; 
        }

        Texture._textures[key] = new Texture(src, gl);
    }

    public static getTexture(key: string): Texture {
        if (!Texture._textures[key]) {
            throw new Error("Couldn't find texture [" + key + "]");
        }
        
        return Texture._textures[key];
    }

    public static areTexturesReady(): boolean {
        for (const i in Texture._textures) {
            if (!Texture._textures[i].ready) { return false; }
        }

        return true;
    }

    public get ready(): boolean { return this._ready; }
    public get texture(): WebGLTexture { return this._texture; }
    public get width(): number { return this._image.width; }
    public get height(): number { return this._image.height; }
}

export default Texture;