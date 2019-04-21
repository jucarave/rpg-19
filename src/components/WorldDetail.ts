import Image from "engine/geometries/Image";
import Component from "engine/world/Component";
import Camera from "engine/world/Camera";
import OrderDraw from "./OrderDraw";
import BasicSeeThroughMaterial from "engine/materials/BasicSeeThroughMaterial";
import RenderTexture from "engine/RenderTexture";

interface Detail {
    position: Array<number>;
    image: Image;
}

class WorldDetail extends Component {
    private _images         : Array<Detail>;

    constructor() {
        super();

        this._images = [];
    }

    public start(): void {
        const orderDraw = this.entity.scene.getEntity("OrderDraw");
        const comp = <OrderDraw>orderDraw.getComponent("OrderDraw");

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
        const renderTexture = RenderTexture.getRenderTexture("Entities");
        
        BasicSeeThroughMaterial.render(image, image.texture, renderTexture.texture, this.entity, camera);
    }

    public get componentName(): string { return "WorldDetail"; }
}

export default WorldDetail;