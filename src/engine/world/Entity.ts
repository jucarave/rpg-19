import Vector2 from "../math/Vector2";
import Image from "../geometries/Image";
import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import Component from "./Component";
import Scene from "./Scene";
import BasicMaterial from "engine/materials/BasicMaterial";

class Entity {
    private _image                      : Image;
    private _transMatrix                : Matrix4;
    private _components                 : Array<Component>;
    private _started                    : boolean;

    public scene                        : Scene;

    public readonly name                : string;
    public readonly position            : Vector2;

    constructor(name: string, x: number, y: number, image?: Image) {
        this.name = name;
        this.position = new Vector2(x, y);
        this._image = image;
        this._transMatrix = Matrix4.identity();
        this._components = new Array();
        this._started = false;

        this.position.onChange.add(() => { this._updateTransformationMatrix(); });
        this._updateTransformationMatrix();
    }

    private _updateTransformationMatrix(): void {
        this._transMatrix.translate(this.position.x, -this.position.y, 0.0);
    }

    public addComponent(component: Component): void {
        this._components.push(component);

        component.entity = this;

        if (this._started) {
            component.start();
        }
    }

    public getComponent(componentName: string): Component {
        for (let i=0,comp;comp=this._components[i];i++) {
            if (comp.componentName === componentName) {
                return comp;
            }
        }

        return null;
    }

    public start(): void {
        this._components.forEach((component: Component) => {
            component.start();
        });

        this._started = true;
    }

    public update(): void {
        this._components.forEach((component: Component) => {
            component.update();
        });
    }

    public destroy(): void {
        this._components.forEach((component: Component) => {
            component.destroy();
        });

        this.scene.removeEntity(this);
    }

    private _renderComponents(camera: Camera): void {
        this._components.forEach((component: Component) => {
            component.render(camera);
        });
    }

    public render(camera: Camera): void {
        if (!this._image) { 
            this._renderComponents(camera);
            return; 
        }

        if (!camera.isGeometryOnCamera(this._image, this)) {
            return;
        }

        BasicMaterial.render(this._image, this._image.texture, this, camera);

        this._renderComponents(camera);
    }

    public get transformationMatrix(): Matrix4 {
        return this._transMatrix;
    }
}

export default Entity;