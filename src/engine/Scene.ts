import Entity from "./Entity";
import Camera from "./Camera";

interface Layers {
    [index: string]: Array<Entity>;
}

class Scene {
    private _layers             : Layers;
    private _camera             : Camera;
    private _started            : boolean;

    constructor() {
        this._layers = {};
        this._camera = new Camera(512, 288);
        this._started = false;
    }

    public addLayer(layerId: string) {
        this._layers[layerId] = new Array();
    }

    public addEntity(entity: Entity, layerId: string): void {
        if (!this._layers[layerId]) {
            throw new Error("Cannot find layer [" + layerId + "]");
        }

        const layer = this._layers[layerId];
        layer.push(entity);

        if (this._started) {
            entity.start();
        }
    }

    public start(): void {
        for (const i in this._layers) {
            this._layers[i].forEach((entity: Entity) => {
                entity.start();
            });
        }

        this._started = true;
    }

    public update(): void {
        if (!this._started) {
            this.start();
        }

        for (const i in this._layers) {
            this._layers[i].forEach((entity: Entity) => {
                entity.update();
            });
        }
    }

    public render(): void {
        for (const i in this._layers) {
            this._layers[i].forEach((entity: Entity) => {
                entity.render(this._camera);
            });
        }
    }
}

export default Scene;