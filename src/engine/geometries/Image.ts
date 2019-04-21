import Geometry from './Geometry';
import Renderer from '../Renderer';
import { SpriteOptions } from '../Types';
import Texture from 'engine/Texture';
import { VERTEX_SIZE } from 'engine/Constants';

const defaultOptions: SpriteOptions = {
    v2Pivot: [0, 0],
    v4UVs: null
};

class Image extends Geometry {
    private _renderer       : Renderer;
    private _texture        : Texture;
    
    private _gridSize       : number;

    constructor(texture: Texture, renderer: Renderer) {
        super();

        this._renderer = renderer;
        this._texture = texture;
    }

    private _mergeOptions(options: SpriteOptions): SpriteOptions {
        const _options: SpriteOptions = {};

        _options.v2Pivot = options.v2Pivot || defaultOptions.v2Pivot;
        _options.v4UVs = options.v4UVs || defaultOptions.v4UVs;

        return _options;
    }

    public setGridSize(gridSize: number): Image {
        this._gridSize = gridSize;
        return this;
    }

    public addSprite(x: number, y: number, width: number, height: number, options: SpriteOptions = null): void {
        const w = width;
        const h = height;
        const o = this._mergeOptions(options || {});
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
            if (uvs != null) {
                this.addUV(uvs[0]/this._texture.width, uvs[1]/this._texture.height, uvs[2]/this._texture.width, uvs[3]/this._texture.height);
            } else {
                this.addUV(0, 0, 1, 1);
            }
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

    public get texture(): Texture { return this._texture; }
}

export default Image;