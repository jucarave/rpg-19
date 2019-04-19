interface TextureType {
    [index: string]: Texture;
}

class Texture {
    private _image      : HTMLImageElement;
    private _texture    : WebGLTexture;
    private _ready      : boolean;
    private _tiles      : Array<Array<number>>;
    private _tileSize   : Array<number>;

    protected static _textures      : TextureType;

    constructor(src: string, gl: WebGLRenderingContext) {
        this._ready = false;

        this._tiles = null;
        this._tileSize = null;

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

    public loadTiles(width: number, height: number, gridSize: number): Texture {
        this._tiles = [];
        this._tileSize = [width, height];
        const gs = gridSize;

        for (let j=0;j<height;j++) {
            for (let i=0;i<width;i++) {
                this._tiles.push([i*gs, j*gs, gs, gs]);
            }
        }

        return this;
    }

    public getTileUVs(tileX: number, tileY: number): Array<number> {
        return this._tiles[tileY * this._tileSize[0] + tileX];
    }

    public static loadTexture(key: string, src: string, gl: WebGLRenderingContext): Texture {
        if (!Texture._textures) { 
            Texture._textures = {}; 
        }

        Texture._textures[key] = new Texture(src, gl);

        return Texture._textures[key];
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
    public get tileSize(): Array<number> { return this._tileSize; }
}

export default Texture;