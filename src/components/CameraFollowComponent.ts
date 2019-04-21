import Component from "engine/world/Component";

class CameraFollowComponent extends Component {
    public update(): void {
        this.entity.scene.camera.position.set(this.entity.position.x, this.entity.position.y);
    }

    public get componentName(): string { return "CameraFollowComponent"; }
}

export default CameraFollowComponent;