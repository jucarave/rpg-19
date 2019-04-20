import Image from "engine/geometries/Image";
import Component from "engine/world/Component";
import Camera from "engine/world/Camera";
import OrderDrawComponent from "./OrderDrawComponent";
import BasicMaterial from "engine/materials/BasicMaterial";

interface Detail {
    position: Array<number>;
    image: Image;
}

class WorldDetailComponent extends Component {
    private _images         : Array<Detail>;

    constructor() {
        super();

        this._images = [];
    }

    public start(): void {
        const orderDraw = this.entity.scene.getEntity("OrderDraw");
        const comp = <OrderDrawComponent>orderDraw.getComponent("OrderDrawComponent");

        this._images.forEach((value: Detail) => {
            comp.renderImage(
                () => { return value.position[1]; }, 
                (camera: Camera) => { this._orderRender(value.image, camera); }
            );
        });
    }

    public addImage(position: Array<number>, image: Image): void {
        this._images.push({ position, image });
    }

    private _orderRender(image: Image, camera: Camera) {
        BasicMaterial.render(image, image.texture, this.entity, camera);
    }

    public get componentName(): string { return "WorldDetailComponent"; }
}

export default WorldDetailComponent;