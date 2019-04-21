import Component from "engine/world/Component";

class CameraFollow extends Component {
    public update(): void {
        this.entity.scene.camera.position.set(this.entity.position.x << 0, this.entity.position.y << 0);
    }

    public get componentName(): string { return "CameraFollow"; }
}

export default CameraFollow;