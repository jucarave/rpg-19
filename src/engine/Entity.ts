import Vector2 from "./math/Vector2";
import Sprite from "./geometries/Sprite";
import Camera from "./Camera";
import Matrix4 from "./math/Matrix4";
import Component from "./Component";

class Entity {
    private _sprite                     : Sprite;
    private _transMatrix                : Matrix4;
    private _components                 : Array<Component>;
    private _started                    : boolean;

    public readonly position            : Vector2;

    constructor(x: number, y: number, sprite?: Sprite) {
        this.position = new Vector2(x, y);
        this._sprite = sprite;
        this._transMatrix = Matrix4.identity();
        this._components = new Array();
        this._started = false;

        this.position.onChange.add(() => { this._updateTransformationMatrix(); });
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

    public render(camera: Camera): void {
        if (!this._sprite) { return; }

        this._sprite.render(this, camera);
    }

    public get transformationMatrix(): Matrix4 {
        return this._transMatrix;
    }
}

export default Entity;