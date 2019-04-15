import Entity from "./Entity";

abstract class Component {
    public entity            : Entity;

    public start(): void {};
    public update(): void {};

    public abstract get componentName(): string;
}

export default Component;