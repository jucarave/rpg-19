import Entity from "./Entity";
import Camera from "./Camera";

abstract class Component {
    public entity            : Entity;

    public start(): void {};
    public update(): void {};
    public destroy(): void {};
    public render(camera: Camera): void { camera; };

    public abstract get componentName(): string;
}

export default Component;